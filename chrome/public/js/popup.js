const submit = document.getElementById("submit");
const uuid = document.getElementById("uuid");
const tips = document.getElementById("tips");
submit.onclick = () => {
  //注意，!'' 会为真，因为类型转换时先转化为数字类型
  if (uuid.value) {
    chrome.runtime.sendMessage({
      type: "popup",
      data: uuid.value,
    })
    tips.innerText = '项目已开始运行，请回控制台查看'
  }
};
