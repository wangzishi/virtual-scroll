import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { DataService } from "./data.service";
import { IndexTree } from "../vs/base/browser/ui/tree/indexTree";
import {
  TreeVisibility,
  ITreeDragAndDrop,
  ITreeRenderer
} from "../vs/base/browser/ui/tree/tree";
import { IListVirtualDelegate } from "vs/base/browser/ui/list/list";

function inspect<T>(
  target: T,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const name = target.constructor.name;
  descriptor.value = new Proxy(descriptor.value, {
    apply: function(target, thisArg, argumentsList) {
      console.log(`${name}::${propertyKey}`, argumentsList);
      return target.apply(thisArg, argumentsList);
    }
  });
  return descriptor;
}

class DndHandler<T> implements ITreeDragAndDrop<T> {
  @inspect
  onDragOver(
    data: import("../vs/base/browser/dnd").IDragAndDropData,
    targetElement: T,
    targetIndex: number,
    originalEvent: DragEvent
  ): boolean | import("../vs/base/browser/ui/tree/tree").ITreeDragOverReaction {
    return true;
  }

  @inspect
  getDragURI(element: T): string {
    return "tttt";
  }

  @inspect
  getDragLabel?(elements: T[]): string {
    return ` fuck you ! `;
  }

  @inspect
  onDragStart?(
    data: import("../vs/base/browser/dnd").IDragAndDropData,
    originalEvent: DragEvent
  ): void {}

  @inspect
  drop(
    data: import("../vs/base/browser/dnd").IDragAndDropData,
    targetElement: T,
    targetIndex: number,
    originalEvent: DragEvent
  ): void {}
}

class Delegate<T> implements IListVirtualDelegate<T> {
  getHeight(element: T): number {
    return 22;
  }
  getTemplateId(element: T): string {
    return "template";
  }
  hasDynamicHeight?(element: T): boolean {
    return false;
  }
  setDynamicHeight?(element: T, height: number): void {}
}

class Renderer<T> implements ITreeRenderer<T, void, HTMLElement> {
  onDidChangeTwistieState?: import("../vs/base/common/event").Event<T>;
  templateId = "template";
  renderTemplate(container: HTMLElement): HTMLElement {
    // throw new Error("Method not implemented.");
    return container;
  }
  @inspect
  renderElement(
    element: import("../vs/base/browser/ui/tree/tree").ITreeNode<T, void>,
    index: number,
    templateData: any /* void */,
    height: number
  ): void {
    templateData.innerHTML = element.element;
  }

  disposeElement?(
    element: import("../vs/base/browser/ui/tree/tree").ITreeNode<T, void>,
    index: number,
    templateData: HTMLElement,
    height: number
  ): void {
    // throw new Error("Method not implemented.");
  }
  disposeTemplate(templateData: HTMLElement): void {
    // throw new Error("Method not implemented.");
  }
  renderTwistie?(element: T, twistieElement: HTMLElement): void {
    // throw new Error("Method not implemented.");
  }
}

@Component({
  selector: "vsc-tree",
  styleUrls: ["./vsc-tree.css"],
  template: `
    <div class="container" #container></div>
  `
})
export class VscTree implements AfterViewInit {
  @ViewChild("container", { static: true }) container: ElementRef;

  delegate = new Delegate();

  renderer = new Renderer();

  constructor(private dataService: DataService) {}
  ngAfterViewInit(): void {
    console.profile("test");
    console.log({ IndexTree });
    console.log({ container: this.container });
    const dnd = new DndHandler();

    const tree = new IndexTree(
      this.container.nativeElement,
      this.delegate,
      [this.renderer],
      null,
      {
        setRowLineHeight: false,
        dnd
      }
    );

    tree.splice([0], 0, [this.dataService.getData()]);
    console.profileEnd("test");
  }
}
