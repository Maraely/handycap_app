import type { Schema, Struct } from '@strapi/strapi';

export interface FirstNameContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_first_name_contact_infos';
  info: {
    displayName: 'ContactInfo';
  };
  attributes: {
    Adress: Schema.Attribute.Component<'shared.address', false>;
    EmailAddress: Schema.Attribute.Email & Schema.Attribute.Required;
    FirstName: Schema.Attribute.String & Schema.Attribute.Required;
    LastName: Schema.Attribute.String & Schema.Attribute.Required;
    Phone: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedAddress extends Struct.ComponentSchema {
  collectionName: 'components_shared_addresses';
  info: {
    description: '';
    displayName: 'Address';
  };
  attributes: {
    City: Schema.Attribute.String & Schema.Attribute.Required;
    Country: Schema.Attribute.String & Schema.Attribute.Required;
    Number: Schema.Attribute.Integer & Schema.Attribute.Required;
    Street: Schema.Attribute.String & Schema.Attribute.Required;
    ZipCode: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'first-name.contact-info': FirstNameContactInfo;
      'shared.address': SharedAddress;
    }
  }
}
