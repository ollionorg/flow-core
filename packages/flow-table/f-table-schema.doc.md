# This document covers the `data` property options of the `f-table-schema` component.

<table>
 <thead>
	<tr>
		<th>Name</th>
		<th>Type</th>
		<th>Options</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
 </thead>
 <tbody>
	<tr>
		<td>header</td>
		<td>object</td>
		<td></td>
		<td>key-value pair of string and <a href="#header-cell-object">header cell object</a></td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>rows</td>
		<td>array</td>
		<td></td>
		<td>array of <a href="#row-object">row object</a> </td>
		<td>undefined</td>
	</tr>
 </tbody>
</table>

<br/>

### header cell object

<table>
 <thead>
	<tr>
		<th>Name</th>
		<th>Type</th>
		<th>Options</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
 </thead>
 <tbody>
	<tr>
		<td>value</td>
		<td>any</td>
		<td></td>
		<td>Value can be anything which you want to display in cell. if it is object then make sure that you provide template function.</td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>template</td>
		<td>function</td>
		<td></td>
		<td>Used to render custom html markup using lit <a href="https://lit.dev/docs/templates/overview/">template syntax</a></td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>width</td>
		<td>string</td>
		<td></td>
		<td>It can be used to provide the width of that column, which can be specified in pixels, percentages, etc.</td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>selected</td>
		<td>boolean</td>
		<td></td>
		<td>It will display column in selected state.<br/> Note : Make sure that you provide `true` to only single column</td>
		<td>false</td>
	</tr>
	<tr>
		<td>sticky</td>
		<td>boolean</td>
		<td></td>
		<td>It will stick column to left if scrollbar is available</td>
		<td>false</td>
	</tr>
 </tbody>
</table>

<br/>

### row object

<table>
 <thead>
	<tr>
		<th>Name</th>
		<th>Type</th>
		<th>Options</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
 </thead>
 <tbody>
	<tr>
		<td>data</td>
		<td>object</td>
		<td></td>
		<td>key-value pair of string and <a href="#cell-object">cell object</a></td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>details</td>
		<td>function</td>
		<td></td>
		<td>It is used to display more details about a row, which is in a closed state by default. We can open it using the open property of this object.We can use HTML markup with lit <a href="https://lit.dev/docs/templates/overview/">template syntax</a></td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>selected</td>
		<td>boolean</td>
		<td></td>
		<td>It will row in selected state</td>
		<td>false</td>
	</tr>
	<tr>
		<td>state</td>
		<td>string</td>
		<td> "primary" | "neutral" | "success" | "warning" | "danger" | "inherit" | "default"</td>
		<td>It is used to display state of row</td>
		<td>"default"</td>
	</tr>
	<tr>
		<td>open</td>
		<td>boolean</td>
		<td></td>
		<td>Used open `details` of row</td>
		<td>false</td>
	</tr>
 </tbody>
</table>

<br/>

### cell object

<table>
 <thead>
	<tr>
		<th>Name</th>
		<th>Type</th>
		<th>Options</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
 </thead>
 <tbody>
	<tr>
		<td>value</td>
		<td>any</td>
		<td></td>
		<td>Value can be anything which you want to display in cell. if it is object then make sure that you provide template function.</td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>template</td>
		<td>function</td>
		<td></td>
		<td>Used to render custom html markup using lit <a href="https://lit.dev/docs/templates/overview/">template syntax</a></td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>actions</td>
		<td>array</td>
		<td></td>
		<td>Used to display <a href="#action-object">actions</a> in cell.</td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>toString</td>
		<td>function</td>
		<td></td>
		<td>If value is an object then we must use this function to return string version of it, since it will be used for sorting.</td>
		<td>undefined</td>
	</tr>
 </tbody>
</table>

<br/>

### action object

<table>
 <thead>
	<tr>
		<th>Name</th>
		<th>Type</th>
		<th>Options</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
 </thead>
 <tbody>
	<tr>
		<td>icon</td>
		<td>string</td>
		<td></td>
		<td>Icon name from flow icon library</td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>onClick</td>
		<td>function</td>
		<td></td>
		<td>Click event handler</td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>onMouseOver</td>
		<td>funciton</td>
		<td></td>
		<td>Mouse over handler</td>
		<td>undefined</td>
	</tr>
	<tr>
		<td>onMouseLeave</td>
		<td>function</td>
		<td></td>
		<td>Mouse leave handler</td>
		<td>undefined</td>
	</tr>
 </tbody>
</table>
