import text from "./text";
import checkbox from "./checkbox";
import radio from "./radio";
import switchButton from "./switch";
import select from "./select";
import button from "./button";
import { FormBuilderFieldRenderFunction } from "../../../types";
import textarea from "./textarea";
import iconButton from "./icon-button";
import array from "./array";
import object from "./object";
import file from "./file";
import suggest from "./suggest";
import separator from "./separator";
import emoji from "./emoji";
import hidden from "./hidden";
import datetime from "./datetime";
import color from "./color";

const all: Record<string, FormBuilderFieldRenderFunction> = {
	text,
	checkbox,
	textarea,
	radio,
	switchButton,
	select,
	button,
	array,
	object,
	["icon-button"]: iconButton,
	tel: text,
	number: text,
	email: text,
	url: text,
	password: text,
	file,
	suggest,
	separator,
	emoji,
	hidden,
	datetime,
	color
};

export default all;
