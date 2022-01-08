import { DsMiError } from '../Utils/DsMiError';

export default class RandomCharacters {
  /**
   * Function that generates a password with a specified random character length. The specific characters to generate are optional.
   * @param length Number of characters that the password to generate will have.
   * @param characters The random characters that the password to generate will have. It's optional
   * @returns Password with a number of specific random characters.
   * @example
   * password(12); //Returns a password with 12 characters length.
   * password(12, "123456789"); //Returns a password 12 characters long, with characters to choose from 1 to 12.
   */
  public password(length: number, characters?: string): string {
    const charset = characters || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&*()'%-+=/";
    let retVal = '';
    for (let i = 0; i < length || 12; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return retVal;
  }
  /**
   * Function that generates a captcha with a specified random character length. The specific characters to generate are optional.
   * @param length Number of characters that the captcha to generate will have. Default it's 5.
   * @param characters The number of characters that the captcha to generate will have. It's optional
   * @returns Captcha with a number of specific random characters.
   * @example
   * captcha(); //Returns a captcha with 5 characters length.
   * captcha(12); //Returns a captcha with 12 characters length.
   * captcha(12, "123456789"); //Returns a password 12 characters long, with characters to choose from 1 to 12.
   */
  public captcha(length?: number, characters?: string): string {
    const charset = characters || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let retVal = '';
    for (let i = 0; i < length || 5; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return retVal;
  }
  /**
   * Function that generates a random number by specifying a minimum and maximum number.
   * @param min Minimun number to generate.
   * @param max Maximum numbr to generate.
   * @returns Random number between the specified minimum and maximum value.
   * @example
   * captcha(100, 300); //Returns a number between 100 and 300.
   */
  public generateNumber(min: number, max: number): number {
    if (min) throw new DsMiError('You did not specify the minimum value.');
    if (max) throw new DsMiError('You did not specify the maximum value.');
    if (isNaN(min)) throw new DsMiError('Your minimum value is not a number.');
    if (isNaN(max)) throw new DsMiError('Your maximum value is not a number.');
    if (min > max) throw new DsMiError('Your minimun value is higher than the maximum value.');
    return Math.floor(Math.random() * (Math.ceil(max) - Math.floor(max) + 1)) + min;
  }
}
