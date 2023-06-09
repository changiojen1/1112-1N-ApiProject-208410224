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

document.addEventListener("DOMContentLoaded", () => {
  select.forEach((s) => {
    for (const key in countries) {
      const option = document.createElement("option");
      option.value = countries[key];
      option.textContent = countries[key];
      s.appendChild(option);
      // console.log(countries[key]);
    }
  });
});

translateBtn.addEventListener("click", () => {
  translate(input.value);
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  output.value = "";
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

const optionEdit = (from, to, text) => {
  options.body = JSON.stringify({
    from: `${from}`,
    to: `${to}`,
    q: `${text}`,
  });
};

const translate = async (text) => {
  if (text.length > 0) {
    optionEdit(text);
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // console.log(result);
      output.value = result;
    } catch (error) {
      console.error(error);
    }
  } else console.log("請輸入文字");
};
