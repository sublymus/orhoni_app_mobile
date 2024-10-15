
import { Buffer } from 'buffer';
import * as ImagePicker from 'expo-image-picker';

export const PickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
        base64: true,
        selectionLimit: 1
    });

    if (!result.canceled) {
        const uri = result.assets[0].uri;
        const d  = result.assets[0];
        const byteCharacters = Buffer.from(d.base64||'', 'base64');
        const o = {
            uri: `data:${d.mimeType};base64,${d.base64}`,
            name:d.fileName,
            size:byteCharacters.length,
            type: d.mimeType,
        };

        return {
            file:o,
            original:d,
            uri
        }
        
    }
};