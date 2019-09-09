import { Component } from "../Object/Component";
import { BaseAttribute } from "../Base/BaseAttribute";

export type TypeComponent = new () => Component;

export type TypeAny = new () => any;

export type TypeAttribute = new () => BaseAttribute;
