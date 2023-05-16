import * as Quill from "quill";
import * as React from "react";

declare namespace ReactQuill {
	export interface UnprivilegedEditor {
		getLength(): number;
		getText(index?: number, length?: number): string;
		getHTML(): string;
		getBounds(index: number, length?: number): Quill.BoundsStatic;
		getSelection(focus?: boolean): Quill.RangeStatic;
		getContents(index?: number, length?: number): Quill.DeltaStatic;
	}

	export interface ComponentProps {
		id?: string;
		className?: string;
		theme?: string;
		style?: React.CSSProperties;
		readOnly?: boolean;
		value?: string | Quill.Delta;
		defaultValue?: string | Quill.Delta;
		placeholder?: string;
		tabIndex?: number;
		bounds?: string | HTMLElement;
		scrollingContainer?: string | HTMLElement;
		onChange?: (
			content: string,
			delta: Quill.Delta,
			source: Quill.Sources,
			editor: UnprivilegedEditor
		) => void;
		onChangeSelection?: (
			range: Quill.RangeStatic,
			source: Quill.Sources,
			editor: UnprivilegedEditor
		) => void;
		onFocus?: (
			range: Quill.RangeStatic,
			source: Quill.Sources,
			editor: UnprivilegedEditor
		) => void;
		onBlur?: (
			previousRange: Quill.RangeStatic,
			source: Quill.Sources,
			editor: UnprivilegedEditor
		) => void;
		onKeyPress?: React.EventHandler<any>;
		onKeyDown?: React.EventHandler<any>;
		onKeyUp?: React.EventHandler<any>;
		formats?: string[];
		children?: React.ReactElement<any>;
		modules?: Quill.StringMap;
		preserveWhitespace?: boolean;
		toolbar?: never;
		styles?: never;
		pollInterval?: never;
	}

	export interface Mixin {
		createEditor(
			element: HTMLElement,
			config: Quill.QuillOptionsStatic
		): Quill.Quill;
		hookEditor(editor: Quill.Quill): void;
		unhookEditor(editor: Quill.Quill): void;
		setEditorReadOnly(editor: Quill.Quill, value: boolean): void;
		setEditorContents(editor: Quill.Quill, value: Quill.Delta | string): void;
		setEditorSelection(editor: Quill.Quill, range: Quill.RangeStatic): void;
		makeUnprivilegedEditor(editor: Quill.Quill): UnprivilegedEditor;
	}
}

export default class ReactQuill extends React.Component<ReactQuill.ComponentProps> {
	focus(): void;
	blur(): void;
	getEditor(): Quill.Quill;
}

export { Quill } from "quill";
