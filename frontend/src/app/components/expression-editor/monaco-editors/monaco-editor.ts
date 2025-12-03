import { ExpressionField } from '../../../expression-fields/expressionField';
import * as monaco from 'monaco-editor';

export interface IMonacoEditor {
  createEditor(container: HTMLElement, value: string, expressionFields: ExpressionField[]): monaco.editor.IStandaloneCodeEditor;
  dispose(): void;
}