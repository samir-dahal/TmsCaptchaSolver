//Captcha Img Data
const captchaEnter = document.querySelector("#captchaEnter");
captchaEnter.value = "Loading...";
var img = document.querySelector("img[alt='Captcha'"),
  observer = new MutationObserver((changes) => {
    changes.forEach(async (change) => {
      if (change.attributeName.includes("src")) {
        captchaEnter.value = "Loading...";
        const captchaResult = await getImageText(
          await convertToBase64(img.src)
        );
        console.clear();
        console.log(captchaResult);
        captchaEnter.value = captchaResult;
        captchaEnter.dispatchEvent(new Event("input"));
      }
    });
  });
observer.observe(img, { attributes: true });

async function convertToBase64(src) {
  const res = await axios.get(img.src, {
    responseType: "arraybuffer",
  });
  return imageEncode(res.data);
}
function imageEncode(arrayBuffer) {
  let u8 = new Uint8Array(arrayBuffer);
  let b64encoded = btoa(
    [].reduce.call(
      new Uint8Array(arrayBuffer),
      function (p, c) {
        return p + String.fromCharCode(c);
      },
      ""
    )
  );
  let mimetype = "image/jpeg";
  return b64encoded;
}
async function getImageText(base64img) {
  const res = await axios.post("https://bsite.net/samirdahal/api/captchas", {
    base64Image: base64img,
  });
  return res.data.result;
}
