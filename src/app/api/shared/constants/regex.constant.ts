export class Regex {
    static readonly ZIP_CODE = /^\d{5}$/;
    static readonly PHONE_NUMBER = /[1-9]\d{2}\-?\d{3}\-?\d{4}/;
    static readonly PHONE_EXTENSION = /^\d+$/;
    static readonly ALPHA_ONLY = /^[a-zA-Z ]*[A-Za-z][a-zA-Z ]*$/;
    static readonly EMAIL = /^(?=.{1,254}$)(?=.{1,64}@)(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[^-]((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    static readonly DATE = /((0[13578]|1[02])[\/.]31[\/.](18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])[\/.](29|30)[\/.](18|19|20)[0-9]{2})|((0[1-9]|1[0-2])[\/.](0[1-9]|1[0-9]|2[0-8])[\/.](18|19|20)[0-9]{2})|((02)[\/.]29[\/.](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000))/;
    static readonly TIME = /^[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?$/;
    static readonly DATE_AND_TIME = /(0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])[-](19|20)\d\d ([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    static readonly DATE_AND_TIME_AM_PM = /(0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])[-](19|20)\d\d ([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9] ([aApP][mM])$/;
    static readonly ALPHA_NUMERIC = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    static readonly ALPHA_NUMERIC_DECIMAL_POINT = /^[A-Za-z0-9 _.]*[A-Za-z0-9][A-Za-z0-9 _.]*$/;
    static readonly NUMERIC_ONLY = /^[+]?\d*$/;
    static readonly SSN = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/;
    static readonly LAST4_SSN = /^[\dX]{4}$/;
    static readonly NPI = /^(1|2)\d{9}$/;
    static readonly INVALID_NPI = /^\d{10}$/;
    static readonly DEA = /^[a-zA-Z]([a-zA-Z]|9)\d{7}$/;
    static readonly TAX_ID = /^\d{2}-\d{7}$/;
    static readonly LOCATION_ADDRESS_LINE_1 = /^\d+(.*)$/;
    static readonly USER_NAME = /^[a-zA-Z0-9_.-]*$/;
    static readonly EMAIL_DOMAIN = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    static readonly ANY_GUID = /[0-9A-F]{8}\-[0-9A-F]{4}\-4[0-9A-F]{3}\-[89AB][0-9A-F]{3}\-[0-9A-F]{12}/i;
    static readonly NCPDP = /^\d{7}$/;
    static readonly DATE_RANGE = /(0[1-9]|1[0-2])[/-](0[1-9]|[12][0-9]|3[01])[/-](19|20)\d\d - (0[1-9]|1[0-2])[/-](0[1-9]|[12][0-9]|3[01])[/-](19|20)\d\d/;
    static readonly NAME_UPDATED = /^[a-zA-Z ]+(?:[a-zA-Z-' ]+)+$/; // Alphanumeric with apostrophe or hyphen in the middle or end
    static readonly ICD_10_CODE = /[A-TV-Z][0-9][0-9AB]\.?[0-9A-TV-Z]{0,4}/;
}
