function ProtectAPI(obj, accessors, contextName='this'){
    const descriptors= Object.getOwnPropertyDescriptors(obj);
    Object.getOwnPropertyNames(descriptors).forEach(propName=>{
        if(propName==='constructor') return;
        let descriptor= descriptors[propName];
        let {get, set, value}= descriptor;
        if(get || set){
            if(!set){
                descriptor.set= function(value){
                    throw Error(`Property '${propName}' is read-only, unable to rewrite with ${value}`);
                };
            }
        }else if(typeof value==='function'){
            if(accessors && accessors.indexOf(propName)!==-1){
                descriptors[propName] = {
                    get: function () {
                        const context= this;
                        return function(){
                            return value.apply(context, arguments);
                        }
                    },
                    set: function (v) {
                        throw Error(`Unable to rewrite accessor property '${propName}'. Call ${contextName}.${propName}(newValue') to set the value`);
                    }
                };
            }else {
                descriptor.writable = false;
            }
        }
    });
    Object.defineProperties(obj, descriptors);
}

module.exports= {ProtectAPI};
