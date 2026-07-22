# ngx-opendesign

[![npm](https://img.shields.io/npm/v/ngx-opendesign.svg)](https://www.npmjs.com/package/ngx-opendesign)

OpenDesign is a modern Angular design system with pill-shaped controls, compact rounded surfaces,
light and dark themes, standalone components, `OnPush`, and signal-friendly APIs.

Version 2.0.0 includes 78 components, 10 dependency-free SVG chart types, 2 Angular editors, 116
tree-shakable icons, runtime i18n for English and Vietnamese, and no non-Angular runtime
dependencies. The only peer dependencies are Angular packages: `@angular/core`, `@angular/common`,
`@angular/cdk`, and `@angular/forms`.

Documentation, live demos, source examples, API tables, and playbook screens:
https://gingatimo.github.io/opendesign/

## Install

```bash
npm install ngx-opendesign @angular/cdk @angular/forms
```

Add the OpenDesign stylesheet to `angular.json`:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": ["node_modules/ngx-opendesign/styles/opendesign.css", "src/styles.scss"]
          }
        }
      }
    }
  }
}
```

You can also import the stylesheet from your global stylesheet:

```scss
@import 'ngx-opendesign/styles/opendesign.css';
```

`opendesign.css` defines the public `--g-*` design tokens, the light and dark palettes, component
styles, chart colors, and the CDK accessibility utility used by Toast. You do not need to import
`@angular/cdk/a11y-prebuilt.css` separately.

## Use Components

OpenDesign is standalone-first. Import the components, directives, services, and icons you use from
the single package entry point.

```typescript
import { Component } from '@angular/core';
import { GButton, GCard, GCardHeader } from 'ngx-opendesign';

@Component({
  selector: 'app-example',
  imports: [GButton, GCard, GCardHeader],
  template: `
    <g-card>
      <div gCardHeader>Project status</div>
      <p>This card uses OpenDesign tokens and follows the active theme.</p>
      <button g-button (click)="save()">Save changes</button>
      <button g-button variant="outline">Cancel</button>
    </g-card>
  `,
})
export class ExampleComponent {
  save(): void {
    console.log('saved');
  }
}
```

Some APIs are element components, such as `<g-card>` and `<g-select>`. Others are attribute
directives on native elements, such as `<button g-button>`, `<input gInput>`, `<textarea gTextarea>`,
and `<table gTable>`. The docs show the selector for every component.

## Theme

Light theme is the default. Enable dark theme by setting one attribute on the root document element:

```typescript
document.documentElement.setAttribute('data-g-theme', 'dark');
```

Remove the attribute to return to light theme.

The stylesheet also sets `color-scheme` for the active theme so browser-rendered UI such as
scrollbars, date/time inputs, autofill backgrounds, and spellcheck underlines match the selected
surface.

## Internationalization

The default locale is English (`en-US`). To use Vietnamese defaults, provide the Vietnamese locale
once in `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { gLocaleVi, provideGLocale } from 'ngx-opendesign';

export const appConfig: ApplicationConfig = {
  providers: [provideGLocale(gLocaleVi)],
};
```

Locale data controls built-in labels, accessibility text, date formatting, number formatting, and the
first day of week for date pickers. Use `GLocaleService.use(locale)` to switch locale at runtime.
Explicit inputs supplied by your app, such as labels, placeholders, and `aria-label`, take precedence
over locale defaults.

## Forms

Form controls are split into two binding models:

- CVA controls bind with `formControlName`, `[formControl]`, or `[(ngModel)]`: Input, Textarea,
  Checkbox, Toggle, Radio, Select, Cascade Select, Tree Select, Chips, Input OTP, Datepicker, Time
  Picker, and Date Range Picker.
- Model controls bind with component models: `GSlider` uses `[(value)]`, `GColorPicker` uses
  `[(value)]`, and `GFileInput` uses `[(files)]`.

`GDatepicker`, `GTimePicker`, `GDateRangePicker`, `GStepSlider`, and `GRating` support both form
binding and `[(value)]`. Choose one binding style per instance.

CVA controls automatically show invalid styling when the Angular control is invalid and touched or
dirty. Add validators as usual and call `form.markAllAsTouched()` on submit when you want errors to
appear immediately.

## Icons

Icons are plain data exported as `gIcon*` constants. Import only the icons you render, then pass them
to `GIcon`.

```typescript
import { GIcon, GIconButton, gIconSave } from 'ngx-opendesign';
```

```html
<button g-icon-button aria-label="Save">
  <g-icon [icon]="gIconSave" />
</button>
```

Icon-only buttons must have an accessible name, usually through `aria-label`.

## Component Inventory

- **Buttons (4):** Button, Fab, Icon Button, Action Expand
- **Forms (19):** Input, Textarea, Checkbox, Toggle, Radio, Select, File Input, Datepicker, Date
  Range Picker, Time Picker, Color Picker, Slider, Step Slider, Rating, Cascade Select, Tree Select,
  Chips, Input OTP, Search Field
- **Display (18):** Alert, Badge, Spinner, Progress, Chip, Avatar, Card, Icon, Divider, Image
  Preview, Image Slider, Carousel, Coverflow, Gallery, Media Player, Terminal, Skeleton, Timeline
- **Overlay (5):** Dialog, Drawer, Tooltip, Toast, Context Menu
- **Navigation (11):** Action Menu, Tabs, Topbar, Sidebar, Stepper, Link, Pagination, Breadcrumb,
  Menu, Accordion, Dock Menu
- **Layout (6):** Layout, Container, Stack, Grid, Splitter, Scroll Panel
- **Data (3):** Table, Organization Chart, Reorder List
- **Charts (10):** Line, Bar, Pie, Donut, Polar, Radar, Stacked Bar, Honeycomb, Heatmap, Calendar
  Heatmap
- **Editors (2):** Code Editor, Rich Text Editor

## Charts

Charts are rendered with SVG and do not depend on charting libraries. The package includes line, bar,
pie, donut, polar, radar, stacked bar, honeycomb, heatmap, and calendar heatmap charts.

Shared chart features include:

- `title` and `titlePosition`
- optional legends with `legendPosition`
- `exportable` PNG/SVG downloads through `GChartExport`
- `zoomable` fullscreen-style expansion through `GChartZoom`
- CSS-token color defaults from `--g-chart-1` through `--g-chart-18`

## Editors

`GCodeEditor` is an Angular code editor based on a textarea overlay and regex highlighting. It
supports `[(value)]`, CVA binding, line numbers, Tab indentation, IME input, and custom highlighters.

`GRichTextEditor` is a contenteditable rich text editor with undo/redo, text styles, inline
formatting, text color, lists, indentation, alignment, links, tables, paste sanitization, IME support,
and both `[(value)]` and CVA binding.

## AI Agent Guide

The package includes `SKILL.md` for AI coding agents. After installation, agents can read it at
`node_modules/ngx-opendesign/SKILL.md` for selector rules, binding patterns, accessibility notes, and
component lookup tables.

## Requirements

- Angular 22 or newer.
- Peer dependencies: `@angular/core`, `@angular/common`, `@angular/cdk`, and `@angular/forms`.

## License

Apache-2.0
