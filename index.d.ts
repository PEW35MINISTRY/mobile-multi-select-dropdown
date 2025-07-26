
import type * as React from "react";
import { ViewStyle, TextStyle } from 'react-native';

export interface SelectListItem {
    key: string,
    displayLabel: string,
    value: string|number,
    disabled?: boolean | undefined
}

export interface SelectListProps  {
    /** Triggered on selection to return item. */
    onSelectItem?: (item:SelectListItem) => void,

    /** Triggers on selection to return value. */
    onSelectValue?: (item:string|number) => void,

    /**
    * Placeholder text that will be displayed in the select box
    */
    placeholder?: string,

    /**
    * Additional styles for select box
    */
    boxStyles?: ViewStyle,

    /**
    *  	Additional styles for text of select box
    */
    inputStyles?: TextStyle,

    /**
    *  	Additional styles for dropdown scrollview
    */
    dropdownStyles?:ViewStyle,

    /**
    *  Additional styles for dropdown list item
    */
    dropdownItemStyles?: ViewStyle,

    /**
    * Additional styles for list items text
    */
    dropdownTextStyles?: TextStyle,

    /**
    * Maximum height of the dropdown wrapper to occupy
    */
    maxHeight?: number,

    /**
    * Data which will be iterated as options of select list
    */
    optionList: SelectListItem[],

    /**
    * The default option of the select list
    */
    defaultOption?: SelectListItem,

    /**
    * Pass any JSX to this prop like Text, Image or Icon to show instead of search icon
    */
    searchicon?: JSX.Element,

    /**
    *  Pass any JSX to this prop like Text, Image or Icon to show instead of chevron icon
    */
    arrowicon?: JSX.Element,

    /**
    * set to false if you dont want to use search functionality
    */
    search?: boolean,

    /**
    * set to false if you dont want to use search functionality
    */
    searchPlaceholder?: string,

    /**
    * set fontFamily of whole component Text 
    */
    fontFamily?: string,

    /**
    * set this to change the default search failure text
    */
    notFoundText?: string,

    /**
    * Additional styles for disabled list item
    */
    disabledItemStyles?: ViewStyle,

    /**
    * Additional styles for disabled list items text
    */
    disabledTextStyles?: TextStyle,

    /**
    * Control the dropdown with this prop
    */
    dropdownShown?: boolean,

    /**
    *  Pass any JSX to this prop like Text, Image or Icon to show instead of close icon
    */
    closeicon?: JSX.Element,
}


export interface MultipleSelectListProps  {
    /** Triggered on selection to return current selected items array. */
    onSelectItemList?: (item:SelectListItem[]) => void,

    /** Triggered on selection to return current selected values array. */
    onSelectValueList?: (item:(string|number)[]) => void,

    /** Triggered on single selection to return latest selected item. */
    onSelectItem?: (item:SelectListItem) => void,

    /** Triggered on deselection to return latest deselected item. */
    onDeselectItem?: (item:SelectListItem) => void;

    /** Triggered on single selection to return latest selected value. */
    onSelectValue?: (item:string|number) => void,

    /** Triggered on deselection to return latest deselected value. */
    onDeselectValue?: (value: string|number) => void;

    /**
    * Placeholder text that will be displayed in the select box
    */
    placeholder?: string,

    /**
    * Additional styles for select box
    */
    boxStyles?: ViewStyle,

    /**
    *  	Additional styles for text of select box
    */
    inputStyles?: TextStyle,

    /**
    *  	Additional styles for dropdown scrollview 
    */
    dropdownStyles?:ViewStyle,

    /**
    *  Additional styles for dropdown list item
    */
    dropdownItemStyles?: ViewStyle,

    /**
    * Additional styles for list items text
    */
    dropdownTextStyles?: TextStyle,

    /**
    * Maximum height of the dropdown wrapper to occupy
    */
    maxHeight?: number,

    /**
    * Data which will be iterated as options of select list
    */
    optionList: SelectListItem[],

    /**
    * The default option of the select list
    */
    defaultOptions?: SelectListItem[],

    /**
    * Pass any JSX to this prop like Text, Image or Icon to show instead of search icon
    */
    searchicon?: JSX.Element,

    /**
    *  Pass any JSX to this prop like Text, Image or Icon to show instead of chevron icon
    */
    arrowicon?: JSX.Element,

    /**
    * set to false if you dont want to use search functionality
    */
    search?: boolean,

    /**
    * set to false if you dont want to use search functionality
    */
     searchPlaceholder?: string,

    /**
    * set text of label which appears soon after multiple values are selected
    */
    label?: string,

    /**
    * set fontFamily of whole component Text 
    */
    fontFamily?: string,

    /**
    * set this to change the default search failure text
    */
    notFoundText?: string,

    /**
    * Additional styles for disabled list item
    */
    disabledItemStyles?: ViewStyle,

    /**
    * Additional styles for disabled list items text
    */
    disabledTextStyles?: TextStyle,


    /**
    * Additional styles for disabled checkbox
    */
    disabledCheckBoxStyles?: ViewStyle,

    /**
    * Additional styles for checkbox
    */
    checkBoxStyles?: ViewStyle,
   
    /**
    * Control the dropdown with this prop
    */
    dropdownShown?: boolean,

    /**
    *  Pass any JSX to this prop like Text, Image or Icon to show instead of close icon
    */
    closeicon?: JSX.Element,

    
    /**
    * Additional styles for multiselect badge
    */
    badgeStyles?: ViewStyle,

    /**
    * Additional styles for multiselect badge text
    */
    badgeTextStyles?: ViewStyle,

    /**
    * Additional styles for label
    */
    labelStyles?: TextStyle,
}

declare class MultipleSelectList extends React.Component<MultipleSelectListProps> {}

declare class SelectList extends React.Component<SelectListProps> {}

export {
    MultipleSelectList,
    SelectList
};