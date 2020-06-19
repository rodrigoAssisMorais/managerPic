import { ValidatorFn, FormGroup } from '@angular/forms';

export const userNamePassword: ValidatorFn = (formGroup: FormGroup) => {
    const userName = formGroup.get('userName').value;
    const password = formGroup.get('password').value;
    // isso ficou estranho, acho que dava para fazer direto no template usando o submmited
    if(userName.trim() + password.trim()) {
        return userName != password
            ? null
            : { userNamePassword: true };
    } else {
        return null;
    }
        
}