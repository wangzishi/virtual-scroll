import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { DataService } from "./data.service";
import { IndexTree } from "../vs/base/browser/ui/tree/indexTree";
import { TreeVisibility } from "../vs/base/browser/ui/tree/tree";

@Component({
  selector: "vsc-tree",
  styleUrls: ["./vsc-tree.css", "../vs/base/browser/ui/list/list.css"],
  template: `
    <div class="container" #container></div>
  `
})
export class VscTree implements AfterViewInit {
  @ViewChild("container", { static: true }) container: ElementRef;

  delegate = {
    getHeight(elm) {
      // console.log(elm);
      return 22;
    },
    getTemplateId() {
      return "template";
    },
    hasDynamicHeight() {
      return true;
    }
  };

  renderer = {
    templateId: "template",
    renderTemplate(container) {
      return container;
    },
    renderElement(element, index, container) {
      container.innerHTML = element.element;
    },
    disposeElement() {},
    disposeTemplate() {}
  };

  constructor(private dataService: DataService) {}
  ngAfterViewInit(): void {
    // console.log(this.dataService.getData());
    console.log({ IndexTree });
    console.log({ container: this.container });

    const tree = new IndexTree(
      this.container.nativeElement,
      this.delegate,
      [this.renderer],
      null,
      {
        setRowLineHeight: false
      }
    );

    tree.splice([0], 0, [this.dataService.getData()]);
  }
}
