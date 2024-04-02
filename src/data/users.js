export const USERS = {
    USER_WITH_MINIMAL_ALLOWED_CREDENTIALS_LENGTH : {
        name: 'Ih',
        lastName: 'po',
        email: 'aqa-ipod1@test.com',
        password: 'Secret10',
        repeatPassword: 'Secret10'
    },
    USER_WITH_MAXIMAL_ALLOWED_CREDENTIALS_LENGTH : {
        name: 'somelongnamefortests',
        lastName: 'somelongnamefortests',
        email: 'aqa-ipod2@test.com',
        password: 'Secret10Secret1',
        repeatPassword: 'Secret10Secret1'
    },
    USER_WITH_EMPTY_NAME : {
        name: '',
        lastName: 'po',
        email: 'aqa-ipod@test.com',
        password: 'Secret10',
        repeatPassword: 'Secret10'
    },
    USER_WITH_NAME_LESS_THAN_2_CHARACTERS : {
        name: 'i',
        lastName: 'po',
        email: 'aqa-ipod@test.com',
        password: 'Secret10',
        repeatPassword: 'Secret10'
    },
    USER_WITH_NAME_MORE_THAN_20_CHARACTERS : {
        name: 'somelongnamefortestsa',
        lastName: 'po',
        email: 'aqa-ipod@test.com',
        password: 'Secret10',
        repeatPassword: 'Secret10'
    },
    USER_WITH_NAME_CONTAINS_SPACES : {
        name: 'some name',
        lastName: 'po',
        email: 'aqa-ipod@test.com',
        password: 'Secret10',
        repeatPassword: 'Secret10'
    },
    USER_WITH_NAME_CONTAINS_NON_LETTERS : {
        name: 'somename1',
        lastName: 'po',
        email: 'aqa-ipod@test.com',
        password: 'Secret10',
        repeatPassword: 'Secret10'
    },
    USER_WITH_EMPTY_LAST_NAME : {
        name: 'Ih',
        lastName: '',
        email: 'aqa-ipod@test.com',
        password: 'Secret10',
        repeatPassword: 'Secret10'
    },
    USER_WITH_LAST_NAME_LESS_THAN_2_CHARACTERS : {
        name: 'Ih',
        lastName: 'p',
        email: 'aqa-ipod@test.com',
        password: 'Secret10',
        repeatPassword: 'Secret10'
    },
    USER_WITH_LAST_NAME_MORE_THAN_20_CHARACTERS : {
        name: 'Ih',
        lastName: 'somelongnamefortestsa',
        email: 'aqa-ipod@test.com',
        password: 'Secret10',
        repeatPassword: 'Secret10'
    },
    USER_WITH_LAST_NAME_CONTAINS_SPACES : {
        name: 'Ih',
        lastName: 'some lastname',
        email: 'aqa-ipod@test.com',
        password: 'Secret10',
        repeatPassword: 'Secret10'
    },
    USER_WITH_LAST_NAME_CONTAINS_NON_LETTERS : {
        name: 'Ih',
        lastName: 'somelastname1',
        email: 'aqa-ipod@test.com',
        password: 'Secret10',
        repeatPassword: 'Secret10'
    },
    USER_WITH_EMPTY_EMAIL : {
        name: 'Ih',
        lastName: 'PO',
        email: '',
        password: 'Secret10',
        repeatPassword: 'Secret10'
    },
    USER_WITH_INVALID_EMAIL : {
        name: 'Ih',
        lastName: 'PO',
        email: 'test@',
        password: 'Secret10',
        repeatPassword: 'Secret10'
    },
    USER_WITH_EMAIL_CONTAINS_SPACES : {
        name: 'Ih',
        lastName: 'PO',
        email: 'aqa-test@.com ',
        password: 'Secret10',
        repeatPassword: 'Secret10'
    },
    USER_WITH_EMPTY_PASSWORD : {
        name: 'Ih',
        lastName: 'PO',
        email: 'aqa-ipod@test.com',
        password: '',
        repeatPassword: 'Secret10'
    },
    USER_WITH_PASSWORD_LESS_THAN_8_CHARACTERS : {
        name: 'Ih',
        lastName: 'PO',
        email: 'aqa-ipod@test.com',
        password: 'Secret1',
        repeatPassword: ''
    },
    USER_WITH_PASSWORD_MORE_THAN_15_CHARACTERS : {
        name: 'Ih',
        lastName: 'PO',
        email: 'aqa-ipod@test.com',
        password: 'Secret10Secret10',
        repeatPassword: ''
    },
    USER_WITH_PASSWORD_CONTAINS_NO_INTEGERS : {
        name: 'Ih',
        lastName: 'PO',
        email: 'aqa-ipod@test.com',
        password: 'SecretabSecretc',
        repeatPassword: ''
    },
    USER_WITH_PASSWORD_CONTAINS_NO_CAPITAL_LETTERS : {
        name: 'Ih',
        lastName: 'PO',
        email: 'aqa-ipod@test.com',
        password: 'secret10secret1',
        repeatPassword: ''
    },
    USER_WITH_PASSWORD_CONTAINS_NO_SMALL_LETTERS : {
        name: 'Ih',
        lastName: 'PO',
        email: 'aqa-ipod@test.com',
        password: 'SECRET10SECRET1',
        repeatPassword: ''
    },
    USER_WITH_EMPTY_REPEATPASSWORD : {
        name: 'Ih',
        lastName: 'PO',
        email: 'aqa-ipod@test.com',
        password: 'Secret10',
        repeatPassword: ''
    },
    USER_WITH_NOT_MATCHED_REPEATPASSWORD : {
        name: 'Ih',
        lastName: 'PO',
        email: 'aqa-ipod@test.com',
        password: 'Secret10',
        repeatPassword: 'Secret11'
    }
}