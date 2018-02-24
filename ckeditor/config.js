/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup', 'colors', 'styles' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];
/* removeButtons�ŏ����ƁA�@�\�܂ŏ����Ă��܂��B�Ⴆ�΁AIframe�������ƁA�\�[�X���[�h��iframe���L�����Ă��Awysiwig���[�h�ŕ\�����ꂸ�A�Ȃ��Ȃ�B
	config.removeButtons = 'Save,Templates,NewPage,Preview,Print,Cut,Copy,Paste,PasteText,PasteFromWord,Redo,Undo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,Textarea,TextField,Select,Button,HiddenField,CopyFormatting,RemoveFormat,Subscript,Superscript,NumberedList,Outdent,Indent,BulletedList,CreateDiv,Blockquote,JustifyLeft,JustifyRight,JustifyCenter,BidiLtr,BidiRtl,Language,JustifyBlock,Link,Unlink,Anchor,HorizontalRule,Smiley,SpecialChar,PageBreak,Styles,Format,Font,Maximize,About,Source,ShowBlocks';
*/
	config.removeButtons = 'Save,Templates,NewPage,Preview,Print,Cut,Copy,Paste,PasteText,PasteFromWord,Redo,Undo,Find,Replace,SelectAll,Scayt,CopyFormatting,RemoveFormat,Maximize,About,Source,ShowBlocks';

/*
Form,Checkbox,Radio,Textarea,TextField,Select,Button,HiddenField,
Subscript,Superscript,
NumberedList,Outdent,Indent,BulletedList,CreateDiv,Blockquote,JustifyLeft,JustifyRight,JustifyCenter,BidiLtr,BidiRtl,Language,JustifyBlock,Link,Unlink,Anchor,HorizontalRule,Smiley,SpecialChar,PageBreak,Styles,Format,Font,
*/

};