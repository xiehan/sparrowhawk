import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactNativeModule } from 'angular2-react-native';
import HelloAppComponent from './hello/hello';

@NgModule({
  declarations: [HelloAppComponent],
  imports: [ReactNativeModule, CommonModule],
  bootstrap: [HelloAppComponent],
})
export default class HelloModule {}
