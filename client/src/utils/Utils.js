class Utils {

    addMessage(messages, message){
        messages = messages || '';

        if(messages !== ''){
            messages += '\n';
        }

        messages += message;

        return messages;
    }

    clone(obj){
        return JSON.parse(JSON.stringify(obj));
    }

    removeNullElements(test_array){
        let index = -1;
        const arr_length = test_array ? test_array.length : 0;
        let resIndex = -1;
        const result = [];
        
        while (++index < arr_length) {
            const value = test_array[index];
        
            if (value) {
                result[++resIndex] = value;
            }
        }
        
        return result;
    }

}

export default new Utils();