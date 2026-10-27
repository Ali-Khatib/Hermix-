import { reach } from "../partials.mjs";
export default {
  file: "legal/copyright.html", legal: true, short: "Copyright Policy",
  title: "Copyright Policy", kicker: "Legal",
  description: "How to tell Hermix about material you believe infringes your copyright, and how we handle it.",
  lede: "We respect creators’ rights. If you think something on this website or in Hermix uses your work without permission, tell us and we’ll look into it.",
  body: (cfg, b) => `
<h2 id="scope">What this covers</h2>
<p>Hermix doesn’t currently host content uploaded by users. This website and the Hermix preview contain material we created or licensed, such as text, images, videos, and the Hermix mascot. This policy explains how to raise a concern about any of it.</p>

<h2 id="notice">How to send a notice</h2>
<p>Use ${reach(cfg, b, "copyright")} and choose “Copyright notice”. Please include:</p>
<ol>
  <li>Your name and how we can reach you.</li>
  <li>A description of the work you believe is being infringed.</li>
  <li>Where the material is, such as the page address, or the part of the app and what it shows.</li>
  <li>A statement that you believe in good faith the use isn’t authorised by the owner, their agent, or the law.</li>
  <li>A statement that the information in your notice is accurate, and that you own the rights or are authorised to act for the owner.</li>
  <li>Your full name, as your electronic signature.</li>
</ol>
<p>Notices that leave out this information may take longer, because we may need to ask you for it.</p>

<h2 id="what-we-do">What happens next</h2>
<p>We review each notice. If we agree the material infringes, we’ll remove or change it and let you know. If we don’t agree, or need more information, we’ll explain why.</p>

<h2 id="counter">If you think we got it wrong</h2>
<p>If material you provided was removed because of a notice, and you believe that was a mistake, use the same contact form to explain why. Include the details above that apply to you.</p>

<h2 id="misuse">Please be accurate</h2>
<p>Knowingly sending a false notice can have legal consequences, and it slows down genuine reports. If you aren’t sure whether something infringes your rights, consider getting legal advice first.</p>`,
};
