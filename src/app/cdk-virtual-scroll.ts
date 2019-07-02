import { ChangeDetectionStrategy, Component } from "@angular/core";

/** @title Basic virtual scroll */
@Component({
  selector: "cdk-virtual-scroll",
  styles: [
    `
      .example-viewport {
        height: 700px;
        width: 200px;
        border: 1px solid black;
      }
    `,
    `
      .example-item {
        height: 20px;
      }
    `
  ],
  template: `
    <cdk-virtual-scroll-viewport itemSize="20" class="example-viewport">
      <div *cdkVirtualFor="let item of items" class="example-item">
        {{ item }}
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdkVirtualScrollOverviewExample {
  items = new Array(1_000_000).fill(undefined).map((_, i) => `Item #${i}`);
}
