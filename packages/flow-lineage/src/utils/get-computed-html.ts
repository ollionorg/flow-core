import { TemplateResult } from "lit";

const getRenderString = (data: TemplateResult) => {
  const { strings, values } = data;
  const v = [...values, ""]; // + last emtpty part
  return strings.reduce((acc, s, i) => acc + s + v[i], "");
};

export default function getComputedHTML(data: TemplateResult) {
  const { strings, values } = data;
  const v = [...values, ""].map((e) =>
    typeof e === "object" ? getRenderString(e as TemplateResult) : e
  );
  return strings.reduce((acc, s, i) => acc + s + v[i], "");
}
