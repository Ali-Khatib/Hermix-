"""Make honest six-second loops from actual app screenshots. Requires Pillow and FFmpeg with libvpx.
Usage: python scripts/render-screen-previews.py --ffmpeg /path/to/ffmpeg
No UI interactions are simulated. The camera returns to its exact starting position.
"""
from pathlib import Path
from PIL import Image
import argparse, math, subprocess, io
p=argparse.ArgumentParser(); p.add_argument('--ffmpeg', default='ffmpeg'); a=p.parse_args()
root=Path(__file__).resolve().parents[1]
media=root/'media/landing'
for name, source, size in [('setup-interview', media/'setup-interview-screen-v1.webp',(1080,900)), ('browser-helper',media/'browser-connection-v2.webp',(1280,448))]:
    screen=Image.open(source).convert('RGB')
    for mobile in [False,True]:
        w,h=size
        if mobile: h=round(h*720/w/2)*2; w=720
        folder=media/'video'/('720' if mobile else '')
        folder.mkdir(parents=True,exist_ok=True)
        output=folder/(name+('-720' if mobile else '')+'-preview-v1.webm')
        cmd=[a.ffmpeg,'-hide_banner','-loglevel','error','-y','-f','image2pipe','-vcodec','mjpeg','-r','20','-i','pipe:0','-an','-c:v','libvpx','-b:v','0','-crf','12','-deadline','good','-cpu-used','2','-pix_fmt','yuv420p',str(output)]
        proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
        for n in range(120):
            # Gentle, periodic camera breathe: no fake clicks, text, tabs or state changes.
            z=.94+.025*(1-math.cos(2*math.pi*n/120))/2
            scale=min(w/screen.width,h/screen.height)*z
            im=screen.resize((round(screen.width*scale),round(screen.height*scale)),Image.Resampling.LANCZOS)
            frame=Image.new('RGB',(w,h),'#eae2d4'); frame.paste(im,((w-im.width)//2,(h-im.height)//2))
            if n==0 and not mobile:
                frame.save(media/'posters'/(name+'-preview-v1.webp'),quality=92)
            b=io.BytesIO();frame.save(b,format='JPEG',quality=95);proc.stdin.write(b.getvalue())
        proc.stdin.close()
        if proc.wait(): raise RuntimeError('FFmpeg failed: '+str(output))
        print(output.relative_to(root),output.stat().st_size)
