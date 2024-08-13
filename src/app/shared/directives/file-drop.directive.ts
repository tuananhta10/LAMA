import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective  {
    constructor() {}

    @Output() whenFileDropped: EventEmitter<any> = new EventEmitter<any>();

    @HostBinding('style.opacity')
    opacity = '1';

    @HostListener('dragover', ['$event']) onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.opacity = '0.5';
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.opacity = '1';
    }

    @HostListener('drop', ['$event']) public ondrop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.opacity = '1';
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            this.whenFileDropped.emit(files);
        }
    }
} 