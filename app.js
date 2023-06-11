const countries = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu",
};
const url = "https://rapid-translate-multi-traduction.p.rapidapi.com/t";
let options = {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": "563ff64563msh068d946124e802ap1566dcjsn01e552b57193",
    "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
  },
  body: JSON.stringify({
    from: "en",
    to: "zh_tw",
    q: `Hello!`,
  }),
};

//transBox
const input = document.querySelector("#input");
const output = document.querySelector("#output");

//btns
const translateBtn = document.querySelector("#translate");
const clearBtn = document.querySelector("#clear");
const copyBtn = document.querySelector("#copy");

const select = document.querySelectorAll("select");
const selectFrom = select[0];
const selectTo = select[1];

//dropArea
const dropArea = document.querySelector("#dropArea");
const fileInput = document.querySelector("#fileInput");
let uploadedFiles = [];

document.addEventListener("DOMContentLoaded", () => {
  select.forEach((item) => {
    for (const key in countries) {
      const option = document.createElement("option");
      option.value = countries[key];
      option.textContent = countries[key];
      item.appendChild(option);
      // console.log(countries[key]);
    }
  });
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  output.value = "";
  dropArea.innerHTML = '<i class="fa fa-cloud-upload"></i>  拖曳或點擊上傳檔案';
  dropArea.className = "file-upload";
  uploadedFiles = [];
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(output.value)
    .then(() => {
      console.log("已複製到剪貼板", output.value);
    })
    .catch(() => {
      console.log("複製失敗");
    });
});

translateBtn.addEventListener("click", () => {
  translate(input.value);
});

const optionEdit = (text) => {
  let from;
  let to;
  for (const key in countries) {
    if (countries[key] === selectFrom.value) from = key;
    else from = "auto";
    if (countries[key] === selectTo.value) to = key;
  }

  options.body = JSON.stringify({
    from: `${from}`,
    to: `${to}`,
    q: `${text}`,
  });
  console.log(options.body);
};

const translate = async (text) => {
  if (text.length > 0) {
    const transText = await fetchAPI(text);
    if (typeof transText[0] === "string") {
      output.value = transText;
    } else output.value = transText[0][0];
  }
  if (uploadedFiles.length > 0) {
    let blob;
    for (const file of uploadedFiles) {
      const fileContent = await readFileContent(file);
      const transContent = await fetchAPI(fileContent);
      let result;
      if (typeof transContent[0] != "string") {
        result = transContent[0][0];
      } else result = transContent;
      // console.log("fileContent", fileContent);
      if (file.type === "text/plain") {
        blob = new Blob([result], { type: "text/plain" });
        const downloadLink = URL.createObjectURL(blob);
        const linkElement = document.createElement("a");
        linkElement.href = downloadLink;
        const fileName = file.name.substring(0, file.name.lastIndexOf("."));
        linkElement.download = `${fileName}_${selectTo.value}.txt`;
        linkElement.click();
        URL.revokeObjectURL(downloadLink);
      }
    }
  }
};

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  uploadFileHandler(files);
  console.log("uploadedFiles", uploadedFiles);
});

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dropArea.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  uploadFileHandler(fileInput.files);
  console.log("uploadedFiles", uploadedFiles);
});

const uploadFileHandler = (files) => {
  console.log(files);
  const allowedTypes = ["text/plain"];
  const allowedFiles = Array.from(files).filter((file) =>
    allowedTypes.includes(file.type)
  );
  uploadedFiles.push(...allowedFiles);
  showUploadFiles(uploadedFiles);
};

const showUploadFiles = (files) => {
  if (uploadedFiles) {
    dropArea.className = "existFile";
    dropArea.textContent = "";
  }
  for (const file of files) {
    const fileEl = document.createElement("div");
    fileEl.textContent = `${file.name}`;
    dropArea.appendChild(fileEl);
  }
};

const readFileContent = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      if (content) {
        resolve(content);
      }
    };
    reader.readAsText(file);
  });
};

const fetchAPI = async (text) => {
  optionEdit(text);
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
