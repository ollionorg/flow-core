import { PropertyValueMap, unsafeCSS } from "lit";
import { FRoot, flowElement } from "@cldcvr/flow-core";
import eleStyle from "./f-code-editor.scss";
import * as monaco from "monaco-editor";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
	getWorker(_, label) {
		if (label === "json") {
			return new jsonWorker();
		}
		if (label === "css" || label === "scss" || label === "less") {
			return new cssWorker();
		}
		if (label === "html" || label === "handlebars" || label === "razor") {
			return new htmlWorker();
		}
		if (label === "typescript" || label === "javascript") {
			return new tsWorker();
		}
		return new editorWorker();
	}
};

@flowElement("f-code-editor")
export class FCodeEditor extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle)];

	editor?: monaco.editor.IStandaloneCodeEditor;

	createRenderRoot() {
		return this;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		const value = `// Example class
		class Person {
		  private name: string;
		  private age: number;
		
		  constructor(name: string, age: number) {
			this.name = name;
			this.age = age;
		  }
		
		  greet(): void {
			console.log(\`Hello, my name is \${this.name} and I'm \${this.age} years old.\`);
		  }
		}
		
		// Create instances of Person
		const person1 = new Person("Alice", 25);
		const person2 = new Person("Bob", 30);
		
		// Call the greet method
		person1.greet();
		person2.greet();
		
		// Example function with type annotations
		function addNumbers(a: number, b: number): number {
		  return a + b;
		}
		
		// Call the function
		const result = addNumbers(5, 10);
		console.log("The result is:", result);
		
		// Example interface
		interface Animal {
		  name: string;
		  sound: string;
		  makeSound(): void;
		}
		
		// Implement the Animal interface
		class Dog implements Animal {
		  name: string;
		  sound: string;
		
		  constructor(name: string) {
			this.name = name;
			this.sound = "Woof!";
		  }
		
		  makeSound(): void {
			console.log(this.sound);
		  }
		}
		
		// Create an instance of Dog
		const dog = new Dog("Buddy");
		
		// Call the makeSound method
		dog.makeSound();
		
		// Example generic function
		function reverseArray<T>(array: T[]): T[] {
		  return array.reverse();
		}
		
		// Call the generic function
		const numbers = [1, 2, 3, 4, 5];
		const reversedNumbers = reverseArray(numbers);
		console.log("Reversed numbers:", reversedNumbers);
		
		// Example class with inheritance
		class Vehicle {
		  protected brand: string;
		
		  constructor(brand: string) {
			this.brand = brand;
		  }
		
		  honk(): void {
			console.log("Honk honk!");
		  }
		}
		
		// Subclass of Vehicle
		class Car extends Vehicle {
		  private model: string;
		
		  constructor(brand: string, model: string) {
			super(brand);
			this.model = model;
		  }
		
		  drive(): void {
			console.log(\`Driving a \${this.brand} \${this.model}.\`);
		  }
		}
		
		// Create an instance of Car
		const car = new Car("Toyota", "Camry");
		
		// Call methods from both Vehicle and Car
		car.honk();
		car.drive();
		
		// Example type alias
		type Point = {
		  x: number;
		  y: number;
		};
		
		// Function using the Point type alias
		function calculateDistance(point1: Point, point2: Point): number {
		  const dx = point2.x - point1.x;
		  const dy = point2.y - point1.y;
		  return Math.sqrt(dx * dx + dy * dy);
		}
		
		// Call the function
		const distance = calculateDistance({ x: 0, y: 0 }, { x: 3, y: 4 });
		console.log("Distance:", distance);
		`;

		this.editor = monaco.editor.create(this, {
			value,
			theme: "vs-dark",
			language: "typescript",
			automaticLayout: true,
			autoDetectHighContrast: false,
			readOnly: false,
			fontSize: 16,
			padding: {
				top: 16
			},
			dimension: {
				width: this.offsetWidth,
				height: this.offsetHeight
			}
		});
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-code-editor": FCodeEditor;
	}
}
