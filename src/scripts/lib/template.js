const template = (content) =>
	`<div>
  <p style="line-height: normal; color:black;font-family: Arial, Helvetica, sans-serif; padding-top:10px">
    <small>
      ${content}
    </small>
  </p>
  <p style="line-height: normal; color:black;font-family: Arial, Helvetica, sans-serif;">
    <small>
    <strong>Huddly</strong>
    </br>
    <a style="color:black;font-family: Arial, Helvetica, sans-serif;"
      href="https://www.huddly.com/">huddly.com</a>
    </br>
    </br>
    <a style="color:black;font-family: Arial, Helvetica, sans-serif;"
      href="http://facebook.com/HuddlyInc">facebook.com/HuddlyInc</a>
    </br>
    <a style="color:black;font-family: Arial, Helvetica, sans-serif;"
      href="http://twitter.com/HuddlyInc">twitter.com/HuddlyInc</a>
    </br>
    <a style="color:black;font-family: Arial, Helvetica, sans-serif;"
      href="http://linkedin.com/company/huddly">linkedin.com/company/Huddly</a>
    </small>
  </p>
  <img src="https://huddly.github.io/email-signature/images/Huddly-Logo-Black-2x.png" alt="Huddly Logo" width="40" height="53" style="padding-top: 6px" />
</div>`;

export default template;
