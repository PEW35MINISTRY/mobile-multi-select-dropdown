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
    Keyboard
} from 'react-native';

import { SelectListItem, SelectListProps } from '..';

const SelectList: React.FC<SelectListProps> =  ({
        onSelectItem = () => {},
        onSelectValue = () => {},
        placeholder,
        boxStyles,
        inputStyles,
        dropdownStyles,
        dropdownItemStyles,
        dropdownTextStyles,
        maxHeight,
        optionList,
        defaultOption,
        searchicon = false,
        arrowicon = false,
        closeicon = false,
        search = true,
        searchPlaceholder = "search",
        notFoundText = "No data found",
        disabledItemStyles,
        disabledTextStyles,
        dropdownShown = false,
        fontFamily
    }) => {

    const initialSelectedItemRef = React.useRef<SelectListItem | null>(null);
    const [_firstRender,_setFirstRender] = React.useState<boolean>(true);
    const [dropdown, setDropdown] = React.useState<boolean>(dropdownShown);
    const [selectedItem, setSelectedItem] = React.useState<SelectListItem|undefined>(defaultOption);
    const [height,setHeight] = React.useState<number>(200)
    const animatedvalue = React.useRef(new Animated.Value(0)).current;
    const [filteredDisplayList,setFilteredDisplayList] = React.useState<SelectListItem[]>(optionList)


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

        //Currently not support de-selection
        if(selectedItem) {
            onSelectItem(selectedItem);
            onSelectValue(selectedItem?.value);
        }
    },[selectedItem]);
  
    /* Initialization */
    React.useEffect(() => {

        if(defaultOption && _firstRender && defaultOption.value != undefined){
            initialSelectedItemRef.current = defaultOption;
            setSelectedItem(defaultOption);
        }
        
    },[defaultOption])

    React.useEffect(() => {
        if(!_firstRender){
            if(dropdownShown)
                slidedown();
            else
                slideup();
            
        }
        
    },[dropdownShown]);


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
                                <TouchableOpacity onPress={() => slideup()} >

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
                    <TouchableOpacity style={[styles.wrapper,boxStyles]} onPress={() => { if(!dropdown){ Keyboard.dismiss(); slidedown() }else{ slideup() } }}>
                        <Text allowFontScaling={false} style={[{fontFamily},inputStyles]}>{ (selectedItem === undefined) ? (placeholder) ? placeholder : 'Select' : selectedItem.displayLabel  }</Text>
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
                    <Animated.View style={[{maxHeight:animatedvalue},styles.dropdown,dropdownStyles]}>
                        <ScrollView  contentContainerStyle={{paddingVertical:10,overflow:'hidden'}} nestedScrollEnabled={true}>

                            {
                                (filteredDisplayList.length > 0)
                                ?
                                filteredDisplayList.map((item:SelectListItem, index:number) => {
                                    let disabled = item.disabled ?? false;
                                    if(disabled){
                                        return(
                                            <TouchableOpacity style={[styles.disabledoption,disabledItemStyles]} key={index+item.key} onPress={ () => {}}>
                                                <Text allowFontScaling={false} style={[{color:'#c4c5c6',fontFamily},disabledTextStyles]}>{item.displayLabel} </Text>
                                            </TouchableOpacity>
                                        )
                                    }else{
                                        return(
                                            <TouchableOpacity style={[styles.option,dropdownItemStyles]} key={index} onPress={ () => {
                                                setSelectedItem(item); //Callback triggered in useEffect
                                                slideup();
                                                setTimeout(() => {setFilteredDisplayList(optionList)}, 800);
                                                
                                            }}>
                                                <Text allowFontScaling={false} style={[{fontFamily},dropdownTextStyles]}>{item.displayLabel}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                    
                                })
                                :
                                <TouchableOpacity style={[styles.option,dropdownItemStyles]} >
                                    <Text allowFontScaling={false} style={[{fontFamily},dropdownTextStyles]}>{notFoundText}</Text>
                                </TouchableOpacity>
                            }
                            
                            
                            
                        </ScrollView>
                    </Animated.View>
                :
                null
            }
            
            
        </View>
    )
}


export default SelectList;


const styles = StyleSheet.create({
    wrapper:{ borderWidth:1,borderRadius:10,borderColor:'gray',paddingHorizontal:20,paddingVertical:12,flexDirection:'row',justifyContent:'space-between' },
    dropdown:{ borderWidth:1,borderRadius:10,borderColor:'gray',marginTop:10,overflow:'hidden'},
    option:{ paddingHorizontal:20,paddingVertical:8,overflow:'hidden' },
    disabledoption:{ paddingHorizontal:20,paddingVertical:8,flexDirection:'row',alignItems:'center', backgroundColor:'whitesmoke',opacity:0.9}

})
