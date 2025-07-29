import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    TextInput,
    ViewStyle,
    Pressable,
    Keyboard
} from 'react-native';

import { MultipleSelectListProps, SelectListItem } from '..';

const MultipleSelectList: React.FC<MultipleSelectListProps> = ({
        onSelectItemList = () => {}, 
        onSelectValueList = () => {},
        onSelectItem = () => {},
        onDeselectItem = () => {},
        onSelectValue = () => {},
        onDeselectValue = () => {},
        fontFamily,
        placeholder,
        boxStyles,
        inputStyles,
        dropdownStyles,
        dropdownItemStyles,
        dropdownTextStyles,
        maxHeight,
        optionList,
        searchicon = false,
        arrowicon = false,
        closeicon = false,
        search = true,
        searchPlaceholder = "search",
        label,
        notFoundText = "No data found",
        disabledItemStyles,
        disabledTextStyles,
        disabledCheckBoxStyles,
        labelStyles,
        badgeStyles,
        badgeTextStyles,
        checkBoxStyles,
        dropdownShown = false,
        defaultOptions,
    }) => {

    const initialSelectedItemsRef = React.useRef<string[] | null>(null);
    const [_firstRender,_setFirstRender] = React.useState<boolean>(true);
    const [dropdown, setDropdown] = React.useState<boolean>(dropdownShown);
    const [selectedItemList, setSelectedItemList] = React.useState<SelectListItem[]>([]);
    const [height,setHeight] = React.useState<number>(350)
    const animatedvalue = React.useRef(new Animated.Value(0)).current;
    const [filteredDisplayList,setFilteredDisplayList] = React.useState<SelectListItem[]>(optionList);

    const isItemSelected = (item:SelectListItem):boolean => selectedItemList.some(i => i.value === item.value);

    const slidedown = () => {
        setDropdown(true)
        
        Animated.timing(animatedvalue,{
            toValue:height,
            duration:500,
            useNativeDriver:false,
            
        }).start()
    }
    const slideup = () => {
        
        Animated.timing(animatedvalue,{
            toValue:0,
            duration:500,
            useNativeDriver:false,
            
        }).start(() => setDropdown(false))
    }

    React.useEffect( () => {
        if(maxHeight)
            setHeight(maxHeight)
    },[maxHeight])

    
    React.useEffect(() => {
        setFilteredDisplayList(optionList);
      },[optionList])


    /** Trigger callback on selection */
    React.useEffect(() => {
        if(_firstRender){
          _setFirstRender(false);
          return;
        }
        
        onSelectItemList(selectedItemList);
        onSelectValueList(selectedItemList.map(item => item.value));
        
    },[selectedItemList])

    /* Initialization */
    React.useEffect(() => {
        if(defaultOptions && defaultOptions.length > 0 && _firstRender) {  
            initialSelectedItemsRef.current = defaultOptions.map(({key}) => {return key});
            setSelectedItemList(defaultOptions);
        }  
    },[defaultOptions]);
    
    React.useEffect(() => {
        if(!_firstRender){
            if(dropdownShown)
                slidedown();
            else
                slideup();
            
        }
        
    },[dropdownShown])


    // Filter list by query, prioritizing matches in `value` over `displayLabel`
    const searchAndFilter = (query:string) => {
        const lowerQuery = query.toLowerCase();
        setFilteredDisplayList(optionList
            .filter(item =>
            String(item.value).toLowerCase().includes(lowerQuery) ||
            String(item.displayLabel).toLowerCase().includes(lowerQuery)
            )
            .sort((a, b) =>
            String(b.value).toLowerCase().includes(lowerQuery) ? 1 :
            String(a.value).toLowerCase().includes(lowerQuery) ? -1 : 0
        ));
    };



    return(
        <View>
            {
                (dropdown && search)
                ?
                    <View style={[styles.wrapper,boxStyles]}>
                        <View style={{flexDirection:'row',alignItems:'center',flex:1}}> 
                            {
                                (!searchicon)
                                ?
                                <Image 
                                    source={require('../assets/images/search.png')}
                                    resizeMode='contain'
                                    style={{width:20,height:20,marginRight:7}}
                                />
                                :
                                searchicon
                            }
                            
                            <TextInput 
                                allowFontScaling={false}
                                placeholder={searchPlaceholder}
                                onChangeText={(val) => searchAndFilter(val)}
                                style={[{padding:0,height:20,flex:1,fontFamily},inputStyles]}
                            />
                                <TouchableOpacity onPress={() => {
                                    slideup()
                                    // setTimeout(() => setFilteredData(data), 800)
                                }} >
                                    {
                                        (!closeicon)
                                        ?
                                            <Image 
                                                source={require('../assets/images/close.png')}
                                                resizeMode='contain'
                                                style={{width:17,height:17}}
                                            />
                                        :
                                            closeicon
                                    }
                                </TouchableOpacity>
                                
                           
                        </View>
                        
                    </View>
                :

                (selectedItemList?.length > 0 )

                ?
                    <TouchableOpacity style={[styles.wrapper,boxStyles]} onPress={() => { if(!dropdown){ Keyboard.dismiss(); slidedown() }else{ slideup() } }} >
                        <View>
                            <Text allowFontScaling={false} style={[{fontWeight:'600',fontFamily},labelStyles]}>{ label }</Text>
                            <View style={{flexDirection:'row',marginBottom:8,flexWrap:'wrap'}}>
                                {
                                    selectedItemList?.map((item,index) => {
                                        return (
                                            <View key={index+item.key} style={[{backgroundColor:'gray',paddingHorizontal:20,paddingVertical:5,borderRadius:50,marginRight:10,marginTop:10}, badgeStyles]}>
                                                <Text allowFontScaling={false} style={[{color:'white',fontSize:12,fontFamily}, badgeTextStyles]}>{item.displayLabel}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={[styles.wrapper,boxStyles]} onPress={() => { if(!dropdown){ Keyboard.dismiss(); slidedown() }else{ slideup() } }}>
                        <Text allowFontScaling={false} style={[{fontFamily},inputStyles]}>{ (placeholder) ? placeholder : 'Select' }</Text>                      
                        {
                            (!arrowicon)
                            ?
                                <Image 
                                    source={require('../assets/images/chevron.png')}
                                    resizeMode='contain'
                                    style={{width:20,height:20}}
                                />
                            :
                                arrowicon
                        }
                        
                    </TouchableOpacity>
            }
            
            {
                (dropdown)
                ?
                    <Animated.View style={[{maxHeight:animatedvalue},styles.dropdown, dropdownStyles]}>
                        <View style={[{maxHeight:height}]}>
                            <ScrollView contentContainerStyle={{paddingVertical:10}} nestedScrollEnabled={true}>

                                {
                                    (filteredDisplayList.length >=  1)
                                    ?
                                    filteredDisplayList.map((item:SelectListItem, index:number) => {
                                        let disabled = item.disabled ?? false;
                                        if(disabled){
                                            return(
                                                <TouchableOpacity style={[styles.disabledoption,disabledItemStyles]} key={index+item.key}>
                                                    <View style={[{width:15,height:15,marginRight:10,borderRadius:3,justifyContent:'center',alignItems:'center',backgroundColor:'#c4c5c6'},disabledCheckBoxStyles]}>
                                                        
                                                        {
                                                            isItemSelected(item) ?                                                                
                                                                <Image 
                                                                    key={index}
                                                                    source={require('../assets/images/check.png')}
                                                                    resizeMode='contain'
                                                                    style={[{width:8,height:8,paddingLeft:7}]}
                                                                />
                                                
                                                            :
                                                            null

                                                        }
                                                    </View>
                                                    <Text allowFontScaling={false} style={[{fontFamily,color:'#c4c5c6'},disabledTextStyles]}>{item.displayLabel}</Text>
                                                </TouchableOpacity>
                                            )
                                        }else{
                                            return(
                                                <TouchableOpacity style={[styles.option,dropdownItemStyles]} key={index+item.key} onPress={ () => {

                                                    //Exists -> Remove
                                                    if(isItemSelected(item)) {
                                                        setSelectedItemList(list => list.filter(i => i.value !== item.value));
                                                        onDeselectItem(item);
                                                        onDeselectValue(item.value);
                                                        
                                                    //Add
                                                    } else {
                                                        setSelectedItemList([...selectedItemList, item]);
                                                        onSelectItem(item);
                                                        onSelectValue(item.value);
                                                    }

                                                }}>
                                                    <View style={[{width:15,height:15,borderWidth:1,marginRight:10,borderColor:'gray',borderRadius:3,justifyContent:'center',alignItems:'center'}, isItemSelected(item) && {backgroundColor: 'white'} ,checkBoxStyles]}>
                                                                                                                
                                                    </View>
                                                    <Text allowFontScaling={false} style={[{fontFamily},dropdownTextStyles]}>{item.displayLabel}</Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                        
                                    })
                                    :
                                    <TouchableOpacity style={[styles.option,dropdownItemStyles]}>
                                        <Text allowFontScaling={false} style={dropdownTextStyles}>{notFoundText}</Text>
                                    </TouchableOpacity>
                                }
                                
                                
                                
                            </ScrollView>
                            
                                {
                                    (selectedItemList.length > 0)
                                    ?
                                        <Pressable>
                                            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',paddingLeft:20}}>
                                                <Text allowFontScaling={false} style={{marginRight:20,fontWeight:'600',fontFamily, color: 'white'}}>Selected</Text>
                                                <View style={{height: 1, flex: 1, backgroundColor: 'gray'}} />
                                            </View>
                                            <View style={{flexDirection:'row',paddingHorizontal:20,marginBottom:20,flexWrap:'wrap'}}>
                                            
                                                {
                                                    selectedItemList.map((item:SelectListItem, index:number) => {
                                                        return (
                                                            <View key={index+item.key} style={[{backgroundColor:'gray',paddingHorizontal:20,paddingVertical:5,borderRadius:50,marginRight:10,marginTop:10},badgeStyles]}>
                                                                <Text allowFontScaling={false} style={[{color:'white',fontSize:12,fontFamily},badgeTextStyles]}>{item.displayLabel}</Text>
                                                            </View>
                                                        )
                                                    })
                                                }

                                            </View>
                                        </Pressable>
                                    :
                                    null
                                }
                                
                                
                            
                        </View>
                       
                    </Animated.View>
                :
                null
            }
            
            
        </View>
    )
}

export default MultipleSelectList;

const styles = StyleSheet.create({
    wrapper:{ borderWidth:1,borderRadius:10,borderColor:'gray',paddingHorizontal:20,paddingVertical:12,flexDirection:'row',justifyContent:'space-between',marginBottom:10 },
    dropdown:{ borderWidth:1,borderRadius:10,borderColor:'gray',overflow:'hidden'},
    option:{ paddingHorizontal:20,paddingVertical:8,flexDirection:'row',alignItems:'center'},
    disabledoption:{ paddingHorizontal:20,paddingVertical:8,flexDirection:'row',alignItems:'center', backgroundColor:'whitesmoke'}

})
