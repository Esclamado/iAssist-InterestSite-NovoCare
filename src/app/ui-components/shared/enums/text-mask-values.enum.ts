/**
 * Pulled From TextMask Documentation: https://text-mask.github.io/text-mask/
 */

import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export enum TextMaskValues {
    Date = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] as any,
    Phone = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] as any,
    Postal = [/\d/, /\d/, /\d/, /\d/, /\d/] as any,
    SSN = [/\d/, /\d/, /\d/, /\d/] as any,
    AlphaNumeric = [/[A-Z0-9a-z]/, /[A-Z0-9a-z]/, /[A-Z0-9a-z]/, /[A-Z0-9a-z]/, /[A-Z0-9a-z]/] as any,
    NPI = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] as any,
    Numeric = createNumberMask({
        prefix: '',
        suffix: '',
        includeThousandsSeparator : '',
        decimalSymbol : ''
      }) as any,
    Tax = [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] as any,
    ICD10Code = [/[A-TV-Za-tv-z]/, /[0-9]/, /[0-9ABab]/, '.', /[0-9A-TV-Za-tv-z]/, /[0-9A-TV-Za-tv-z]/, /[0-9A-TV-Za-tv-z]/, /[0-9A-TV-Za-tv-z]/] as any
}
