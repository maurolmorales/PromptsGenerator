export default function (data) {
  const modelNameInput = document.querySelector("#inputNameModel");
  const SceneFrame = document.querySelector("#SceneFrame");
  const SubjectFrame = document.querySelector("#SubjectFrame");
  const Specific_AspectsFrame = document.querySelector("#SpecificAspectsFrame");
  const BackgroundFrame = document.querySelector("#BackgroundFrame");
  const LandscapeAccurateFrame = document.querySelector(
    "#LandscapeAccurateFrame"
  );
  const ArtistsFrame = document.querySelector("#ArtistsFrame");
  const filterArtist = document.querySelector("#filterArtist");
  const CameraFrame = document.querySelector("#CameraFrame");
  const AdditionalFrame = document.querySelector("#AdditionalFrame");
  const inputFinalPromt = document.querySelector("#finalPromt");
  const inputFinalPromtNegative = document.querySelector(
    "#inputFinalPromtNegative"
  );
  const body = document.querySelector("body");
  const copyicon = document.querySelector("#copyicon");
  const copyNegativePromt = document.querySelector("#copyNegativePromt");
  const plantillas = document.querySelector("#plantilla").content;
  const fragment = document.createDocumentFragment();

  const generarSelect = (category, destino) => {
    let var_category = data[category];
    let classBefore = plantillas.querySelector("select").className;

    for (const i in var_category) {
      if (var_category[i].multiple) {
        let divBox = document.createElement("div");
        divBox.classList.add("wrapCheck");

        var_category[i].data.forEach((e) => {
          let input = document.createElement("input");
          input.type = "checkbox";
          input.classList.add("boxes"); 
          input.setAttribute( "name", i); /*----- Sub Categories  ---------- */
          if (var_category.Person_negative_Promt) {
            input.classList.add(destino.id, "negativePromt");
            input.checked = true;
          } else {
            input.classList.add(destino.id, "positivePromt");
            input.checkedf = false;
          }
          input.value = e;
          let label = document.createElement("label");
          label.classList.add("labelSelect");
          label.innerHTML = e;
          label.appendChild(input);
          divBox.appendChild(label);
          destino.appendChild(divBox);
        });
      } else {
        plantillas.querySelector("label").for = i;
        plantillas.querySelector("label").innerText = i.replaceAll("_", " ");
        plantillas.querySelector("select").name = i; 
        plantillas.querySelector("select").id = i;
        plantillas
          .querySelector("select")
          .classList.replace(classBefore, destino.id);
        plantillas.querySelector("select").innerHTML = "";

        const option = document.createElement("option");
        plantillas.querySelector("select").appendChild(option);
        var_category[i].data.forEach((e) => {
          const option = document.createElement("option");
          option.value = e;
          option.innerText = e;
          plantillas.querySelector("select").appendChild(option);
        });

        const clone = plantillas.cloneNode(true);
        fragment.appendChild(clone);
        destino.appendChild(fragment);
        classBefore = plantillas.querySelector("select").className;
      }
    }
  };

  const barridoPositivePromt = () => {
    let provisional = "";

    const verifInput = (data) => {
      if (data) {
        if (data.type === "select-one" && data.value && !data.value == "") {
          return data.value;
        }
        if (data.type === "checkbox" && data.checked === true) {
          return data.value;
        }
      } else {
        console.log("null");
        return null;
      }
    };

    const verifVowel = (str) => {
      const lowerCaseStr = str.toLowerCase();
      const firstChar = lowerCaseStr.charAt(0);
      return ["a", "e", "i", "o", "u", "h"].includes(firstChar);
    };

    const forSegment = () => {
      let order = "";

      function SceneFrame() {
        let prov = "";

        if (modelNameInput.value) {
          prov += `${modelNameInput.value} `;
        }

        document.querySelectorAll(".SceneFrame").forEach((s) => {
          let s_temp = verifInput(s);
          if (s_temp) {
            prov += s_temp + " ";
          }
        });
        if (prov) {
          order += prov;
        }
      }

      function SubjectFrame() {
        let temporal = "",
          temporalAccesories = "",
          s_temp = "";

        document.querySelectorAll(".SubjectFrame").forEach((s) => {
          s_temp = verifInput(s);
          if (s_temp) {
            switch (s.name) {
              case "Dress_Code":
                temporal += `wearing ${s_temp} `;
                break;
              case "Acction":
                temporal += `while ${s_temp} `;
                break;
              case "Pose":
                verifVowel(String(s_temp))
                  ? (temporal += `in an ${s_temp} `)
                  : (temporal += `in a ${s_temp} `);
                break;
              case "Vehicle":
                verifVowel(String(s_temp))
                  ? (temporal += `an ${s_temp} `)
                  : (temporal += `a ${s_temp} `);
                break;
              case "Accessories":
                temporalAccesories += `${s_temp} `;
                break;
              default:
                temporal += `${s_temp} `;
                break;
            }
          }
        });

        if (temporal.includes("wearing")) {
          if(temporalAccesories != ""){temporal += `and ${temporalAccesories}`}
        }else {
          if(temporalAccesories != ""){(temporal += `wearing ${temporalAccesories}`) }}
        if (temporal) { order += `${temporal.trim()}, `}
      }

      function SpecificAspectsFrame() {
        let temp = "";
        document.querySelectorAll(".SpecificAspectsFrame").forEach((s) => {
          /* */
          let s_temp = verifInput(s);
          const DEFAULT = `${s_temp} `;
          const CASES = {
            Haircut: `${s_temp} haircut `,
          };
          /* */
          if (s_temp) {
            temp += CASES[s.id] || DEFAULT;
          }
        });
        if (temp) {
          order += temp.trim() + ", ";
        }
      }
      function BackgroundFrame() {
        let temp = "";
        document.querySelectorAll(".BackgroundFrame").forEach((b) => {
          if (b.value) {
            temp += verifInput(b) + ", ";
          }
        });
        if (temp) {
          order += temp;
        }
      }
      function LandscapeAccurateFrame() {
        let prov = "";
        document.querySelectorAll(".LandscapeAccurateFrame").forEach((s) => {
          if (s.value) {
            prov += verifInput(s) + ", ";
          }
        });
        if (prov) {
          order += prov;
        }
      }
      function ArtistsFrame() {
        let preArray = [];
        let prov = "";
        document.querySelectorAll(".ArtistsFrame").forEach((s) => {
          let s_temp = verifInput(s);
          if (s_temp) {
            preArray.push(s_temp);
          }
        });

        if (preArray.length > 0) {
          prov += "art by ";
          if (preArray.length > 1) {
            prov += preArray.join(" and ");
          } else {
            prov += preArray[0];
          }

          return (order += `${prov}, `);
        }
      }
      function CameraFrame() {
        let prov = "";
        document.querySelectorAll(".CameraFrame").forEach((s) => {
          if (s.value) {
            prov += verifInput(s) + ", ";
          }
        });
        return (order += prov);
      }
      function AdditionalFrame() {
        let arreglo = [];
        let temp = "";
        document.querySelectorAll(".AdditionalFrame").forEach((s) => {
          let s_temp = verifInput(s);
          if (s_temp) {
            arreglo.push(s_temp);
          }
        });

        if (arreglo.length > 0) {
          temp += arreglo.join(", ");
        }
        if (temp) {
          order += temp;
        }
      }

      SceneFrame();
      SubjectFrame();
      SpecificAspectsFrame();
      BackgroundFrame();
      LandscapeAccurateFrame();
      ArtistsFrame();
      CameraFrame();
      AdditionalFrame();

      provisional = order;
    };
    forSegment();
    return provisional;
  };

  const barridoNegativePromt = () => {
    let temp_negative = "";
    document.querySelectorAll(".negativePromt").forEach((n) => {
      if (n.type === "checkbox" && n.checked === true) {
        temp_negative += `${n.value}, `;
      }
    });
    return temp_negative;
  };

  const tooltipCopy = (imputObject) => {
    imputObject.classList.add("tooltipCopy");
    console.log("inicio");
    setTimeout(() => {
      console.log("fin");
      imputObject.classList.remove("tooltipCopy");
    }, 2500);
  };

  document.addEventListener("change", () => {
    inputFinalPromt.value = barridoPositivePromt();
    inputFinalPromtNegative.value = barridoNegativePromt();
  });

  copyicon.addEventListener("click", () => {
    let varP = inputFinalPromt.value;
    navigator.clipboard.writeText(varP);
    tooltipCopy(body);
  });

  copyNegativePromt.addEventListener("click", () => {
    let varP = inputFinalPromtNegative.value;
    navigator.clipboard.writeText(varP);
    tooltipCopy(body);
  });

  filterArtist.addEventListener("input", () => {
    let varP = filterArtist.value.toLowerCase().trim();
    let varPFiltrado = varP.split(" ");
    document
      .querySelectorAll("#ArtistsFrame .wrapCheck .labelSelect")
      .forEach((a) => {
        let elementA = a.textContent.toLocaleLowerCase();
        let todasLasPalabras = varPFiltrado.every((palabra) =>
          elementA.includes(palabra)
        );
        // if (elementA.includes(varP)) {
        if (todasLasPalabras) {
          a.style.display = "flex";
        } else {
          a.style.display = "none";
        }
      });
  });

  generarSelect("Scene", SceneFrame);
  generarSelect("Subject", SubjectFrame);
  generarSelect("Specific_Aspects", Specific_AspectsFrame);
  generarSelect("Background", BackgroundFrame);
  generarSelect("LandscapeAccurate", LandscapeAccurateFrame);
  generarSelect("Artists", ArtistsFrame);
  generarSelect("Camera", CameraFrame);
  generarSelect("Additional", AdditionalFrame);
  generarSelect("Negative_Promt", negativeInput);
}
