import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date */
  Date: any;
  /** A type representing a formatted java.util.UUID */
  UUID: any;
};

export type Document = {
  __typename?: 'Document';
  bestandsnaam?: Maybe<Scalars['String']>;
  bestandsomvang?: Maybe<Scalars['Int']>;
  creatiedatum?: Maybe<Scalars['String']>;
  formaat?: Maybe<Scalars['String']>;
  identificatie?: Maybe<Scalars['String']>;
  titel?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['UUID']>;
};

export type DocumentContent = {
  __typename?: 'DocumentContent';
  content: Scalars['String'];
};

export type Form = {
  __typename?: 'Form';
  name: Scalars['String'];
  uuid: Scalars['UUID'];
};

export type Klant = {
  __typename?: 'Klant';
  emailadres?: Maybe<Scalars['String']>;
  telefoonnummer?: Maybe<Scalars['String']>;
};

export type KlantUpdateInput = {
  emailadres?: Maybe<Scalars['String']>;
  telefoonnummer?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Updates the profile for the user */
  updateBurgerProfiel?: Maybe<Klant>;
};


export type MutationUpdateBurgerProfielArgs = {
  klant: KlantUpdateInput;
};

export type Persoon = {
  __typename?: 'Persoon';
  burgerservicenummer: Scalars['String'];
  geboorte?: Maybe<PersoonGeboorte>;
  geslachtsaanduiding: Scalars['String'];
  naam: PersoonNaam;
  nationaliteiten?: Maybe<Array<PersoonNationaliteiten>>;
  verblijfplaats?: Maybe<PersoonVerblijfplaats>;
};

export type PersoonGeboorte = {
  __typename?: 'PersoonGeboorte';
  datum: PersoonGeboorteDatum;
  land: PersoonGeboorteLand;
};

export type PersoonGeboorteDatum = {
  __typename?: 'PersoonGeboorteDatum';
  dag: Scalars['Int'];
  datum: Scalars['String'];
  jaar: Scalars['Int'];
  maand: Scalars['Int'];
};

export type PersoonGeboorteLand = {
  __typename?: 'PersoonGeboorteLand';
  code: Scalars['String'];
  omschrijving: Scalars['String'];
};

export type PersoonNaam = {
  __typename?: 'PersoonNaam';
  aanhef: Scalars['String'];
  geslachtsnaam: Scalars['String'];
  voorletters: Scalars['String'];
  voornamen: Scalars['String'];
};

export type PersoonNationaliteit = {
  __typename?: 'PersoonNationaliteit';
  code: Scalars['String'];
  omschrijving: Scalars['String'];
};

export type PersoonNationaliteiten = {
  __typename?: 'PersoonNationaliteiten';
  nationaliteit: PersoonNationaliteit;
};

export type PersoonVerblijfplaats = {
  __typename?: 'PersoonVerblijfplaats';
  huisnummer: Scalars['String'];
  postcode: Scalars['String'];
  straat: Scalars['String'];
  woonplaats: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Gets the profile for the user */
  getBurgerProfiel?: Maybe<Klant>;
  /** Gets a document content by id as base64 encoded */
  getDocumentContent: DocumentContent;
  /** Gets the forms available to the user */
  getFormList: Array<Form>;
  /** Gets the persoon data */
  getPersoon?: Maybe<Persoon>;
  /** Gets a zaak by id */
  getZaak: Zaak;
  /** Gets all zaken for the user */
  getZaken: Array<Zaak>;
};


export type QueryGetDocumentContentArgs = {
  id: Scalars['UUID'];
};


export type QueryGetZaakArgs = {
  id: Scalars['UUID'];
};


export type QueryGetZakenArgs = {
  page?: Maybe<Scalars['Int']>;
};

export type StatusType = {
  __typename?: 'StatusType';
  isEindstatus?: Maybe<Scalars['Boolean']>;
  omschrijving?: Maybe<Scalars['String']>;
};

export type Zaak = {
  __typename?: 'Zaak';
  documenten: Array<Document>;
  identificatie: Scalars['String'];
  omschrijving: Scalars['String'];
  startdatum: Scalars['Date'];
  status?: Maybe<ZaakStatus>;
  statusGeschiedenis: Array<ZaakStatus>;
  statussen: Array<StatusType>;
  url: Scalars['String'];
  uuid: Scalars['UUID'];
  zaaktype: ZaakType;
};

export type ZaakStatus = {
  __typename?: 'ZaakStatus';
  datumStatusGezet: Scalars['String'];
  statustype: ZaakStatusType;
};

export type ZaakStatusType = {
  __typename?: 'ZaakStatusType';
  isEindstatus: Scalars['Boolean'];
  omschrijving: Scalars['String'];
};

export type ZaakType = {
  __typename?: 'ZaakType';
  identificatie: Scalars['String'];
  omschrijving: Scalars['String'];
};

export type UpdateBurgerProfielMutationVariables = Exact<{
  klant: KlantUpdateInput;
}>;


export type UpdateBurgerProfielMutation = { __typename?: 'Mutation', updateBurgerProfiel?: Maybe<{ __typename?: 'Klant', emailadres?: Maybe<string>, telefoonnummer?: Maybe<string> }> };

export type GetBurgerProfielQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBurgerProfielQuery = { __typename?: 'Query', getBurgerProfiel?: Maybe<{ __typename?: 'Klant', emailadres?: Maybe<string>, telefoonnummer?: Maybe<string> }> };

export type GetDocumentenQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetDocumentenQuery = { __typename?: 'Query', getZaak: { __typename?: 'Zaak', zaaktype: { __typename?: 'ZaakType', identificatie: string }, documenten: Array<{ __typename?: 'Document', bestandsnaam?: Maybe<string>, bestandsomvang?: Maybe<number>, creatiedatum?: Maybe<string>, formaat?: Maybe<string>, identificatie?: Maybe<string>, titel?: Maybe<string>, uuid?: Maybe<any> }> } };

export type GetFormsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFormsQuery = { __typename?: 'Query', getFormList: Array<{ __typename?: 'Form', name: string, uuid: any }> };

export type GetPersoonDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersoonDataQuery = { __typename?: 'Query', getPersoon?: Maybe<{ __typename?: 'Persoon', burgerservicenummer: string, geslachtsaanduiding: string, naam: { __typename?: 'PersoonNaam', aanhef: string, voorletters: string, voornamen: string, geslachtsnaam: string }, verblijfplaats?: Maybe<{ __typename?: 'PersoonVerblijfplaats', straat: string, huisnummer: string, postcode: string, woonplaats: string }>, geboorte?: Maybe<{ __typename?: 'PersoonGeboorte', datum: { __typename?: 'PersoonGeboorteDatum', datum: string, jaar: number, maand: number, dag: number }, land: { __typename?: 'PersoonGeboorteLand', code: string, omschrijving: string } }>, nationaliteiten?: Maybe<Array<{ __typename?: 'PersoonNationaliteiten', nationaliteit: { __typename?: 'PersoonNationaliteit', code: string, omschrijving: string } }>> }> };

export type GetPersoonQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersoonQuery = { __typename?: 'Query', getPersoon?: Maybe<{ __typename?: 'Persoon', naam: { __typename?: 'PersoonNaam', geslachtsnaam: string, voornamen: string } }> };

export type GetZaakQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetZaakQuery = { __typename?: 'Query', getZaak: { __typename?: 'Zaak', uuid: any, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string, omschrijving: string }, status?: Maybe<{ __typename?: 'ZaakStatus', datumStatusGezet: string, statustype: { __typename?: 'ZaakStatusType', omschrijving: string, isEindstatus: boolean } }>, statusGeschiedenis: Array<{ __typename?: 'ZaakStatus', datumStatusGezet: string, statustype: { __typename?: 'ZaakStatusType', omschrijving: string, isEindstatus: boolean } }>, statussen: Array<{ __typename?: 'StatusType', omschrijving?: Maybe<string> }>, documenten: Array<{ __typename?: 'Document', bestandsnaam?: Maybe<string>, bestandsomvang?: Maybe<number>, creatiedatum?: Maybe<string>, formaat?: Maybe<string>, identificatie?: Maybe<string>, titel?: Maybe<string>, uuid?: Maybe<any> }> } };

export type GetZakenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetZakenQuery = { __typename?: 'Query', getZaken: Array<{ __typename?: 'Zaak', uuid: any, omschrijving: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string }, status?: Maybe<{ __typename?: 'ZaakStatus', statustype: { __typename?: 'ZaakStatusType', isEindstatus: boolean } }> }> };


export const UpdateBurgerProfielDocument = gql`
    mutation UpdateBurgerProfiel($klant: KlantUpdateInput!) {
  updateBurgerProfiel(klant: $klant) {
    emailadres
    telefoonnummer
  }
}
    `;
export type UpdateBurgerProfielMutationFn = Apollo.MutationFunction<UpdateBurgerProfielMutation, UpdateBurgerProfielMutationVariables>;

/**
 * __useUpdateBurgerProfielMutation__
 *
 * To run a mutation, you first call `useUpdateBurgerProfielMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBurgerProfielMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBurgerProfielMutation, { data, loading, error }] = useUpdateBurgerProfielMutation({
 *   variables: {
 *      klant: // value for 'klant'
 *   },
 * });
 */
export function useUpdateBurgerProfielMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBurgerProfielMutation, UpdateBurgerProfielMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBurgerProfielMutation, UpdateBurgerProfielMutationVariables>(UpdateBurgerProfielDocument, options);
      }
export type UpdateBurgerProfielMutationHookResult = ReturnType<typeof useUpdateBurgerProfielMutation>;
export type UpdateBurgerProfielMutationResult = Apollo.MutationResult<UpdateBurgerProfielMutation>;
export type UpdateBurgerProfielMutationOptions = Apollo.BaseMutationOptions<UpdateBurgerProfielMutation, UpdateBurgerProfielMutationVariables>;
export const GetBurgerProfielDocument = gql`
    query GetBurgerProfiel {
  getBurgerProfiel {
    emailadres
    telefoonnummer
  }
}
    `;

/**
 * __useGetBurgerProfielQuery__
 *
 * To run a query within a React component, call `useGetBurgerProfielQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBurgerProfielQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBurgerProfielQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBurgerProfielQuery(baseOptions?: Apollo.QueryHookOptions<GetBurgerProfielQuery, GetBurgerProfielQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBurgerProfielQuery, GetBurgerProfielQueryVariables>(GetBurgerProfielDocument, options);
      }
export function useGetBurgerProfielLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBurgerProfielQuery, GetBurgerProfielQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBurgerProfielQuery, GetBurgerProfielQueryVariables>(GetBurgerProfielDocument, options);
        }
export type GetBurgerProfielQueryHookResult = ReturnType<typeof useGetBurgerProfielQuery>;
export type GetBurgerProfielLazyQueryHookResult = ReturnType<typeof useGetBurgerProfielLazyQuery>;
export type GetBurgerProfielQueryResult = Apollo.QueryResult<GetBurgerProfielQuery, GetBurgerProfielQueryVariables>;
export const GetDocumentenDocument = gql`
    query GetDocumenten($id: UUID!) {
  getZaak(id: $id) {
    zaaktype {
      identificatie
    }
    documenten {
      bestandsnaam
      bestandsomvang
      creatiedatum
      formaat
      identificatie
      titel
      uuid
    }
  }
}
    `;

/**
 * __useGetDocumentenQuery__
 *
 * To run a query within a React component, call `useGetDocumentenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentenQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDocumentenQuery(baseOptions: Apollo.QueryHookOptions<GetDocumentenQuery, GetDocumentenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentenQuery, GetDocumentenQueryVariables>(GetDocumentenDocument, options);
      }
export function useGetDocumentenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDocumentenQuery, GetDocumentenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentenQuery, GetDocumentenQueryVariables>(GetDocumentenDocument, options);
        }
export type GetDocumentenQueryHookResult = ReturnType<typeof useGetDocumentenQuery>;
export type GetDocumentenLazyQueryHookResult = ReturnType<typeof useGetDocumentenLazyQuery>;
export type GetDocumentenQueryResult = Apollo.QueryResult<GetDocumentenQuery, GetDocumentenQueryVariables>;
export const GetFormsDocument = gql`
    query GetForms {
  getFormList {
    name
    uuid
  }
}
    `;

/**
 * __useGetFormsQuery__
 *
 * To run a query within a React component, call `useGetFormsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFormsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFormsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFormsQuery(baseOptions?: Apollo.QueryHookOptions<GetFormsQuery, GetFormsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFormsQuery, GetFormsQueryVariables>(GetFormsDocument, options);
      }
export function useGetFormsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFormsQuery, GetFormsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFormsQuery, GetFormsQueryVariables>(GetFormsDocument, options);
        }
export type GetFormsQueryHookResult = ReturnType<typeof useGetFormsQuery>;
export type GetFormsLazyQueryHookResult = ReturnType<typeof useGetFormsLazyQuery>;
export type GetFormsQueryResult = Apollo.QueryResult<GetFormsQuery, GetFormsQueryVariables>;
export const GetPersoonDataDocument = gql`
    query GetPersoonData {
  getPersoon {
    burgerservicenummer
    geslachtsaanduiding
    naam {
      aanhef
      voorletters
      voornamen
      geslachtsnaam
    }
    verblijfplaats {
      straat
      huisnummer
      postcode
      woonplaats
    }
    geboorte {
      datum {
        datum
        jaar
        maand
        dag
      }
      land {
        code
        omschrijving
      }
    }
    nationaliteiten {
      nationaliteit {
        code
        omschrijving
      }
    }
  }
}
    `;

/**
 * __useGetPersoonDataQuery__
 *
 * To run a query within a React component, call `useGetPersoonDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersoonDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersoonDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPersoonDataQuery(baseOptions?: Apollo.QueryHookOptions<GetPersoonDataQuery, GetPersoonDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersoonDataQuery, GetPersoonDataQueryVariables>(GetPersoonDataDocument, options);
      }
export function useGetPersoonDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersoonDataQuery, GetPersoonDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersoonDataQuery, GetPersoonDataQueryVariables>(GetPersoonDataDocument, options);
        }
export type GetPersoonDataQueryHookResult = ReturnType<typeof useGetPersoonDataQuery>;
export type GetPersoonDataLazyQueryHookResult = ReturnType<typeof useGetPersoonDataLazyQuery>;
export type GetPersoonDataQueryResult = Apollo.QueryResult<GetPersoonDataQuery, GetPersoonDataQueryVariables>;
export const GetPersoonDocument = gql`
    query GetPersoon {
  getPersoon {
    naam {
      geslachtsnaam
      voornamen
    }
  }
}
    `;

/**
 * __useGetPersoonQuery__
 *
 * To run a query within a React component, call `useGetPersoonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersoonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersoonQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPersoonQuery(baseOptions?: Apollo.QueryHookOptions<GetPersoonQuery, GetPersoonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersoonQuery, GetPersoonQueryVariables>(GetPersoonDocument, options);
      }
export function useGetPersoonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersoonQuery, GetPersoonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersoonQuery, GetPersoonQueryVariables>(GetPersoonDocument, options);
        }
export type GetPersoonQueryHookResult = ReturnType<typeof useGetPersoonQuery>;
export type GetPersoonLazyQueryHookResult = ReturnType<typeof useGetPersoonLazyQuery>;
export type GetPersoonQueryResult = Apollo.QueryResult<GetPersoonQuery, GetPersoonQueryVariables>;
export const GetZaakDocument = gql`
    query GetZaak($id: UUID!) {
  getZaak(id: $id) {
    uuid
    omschrijving
    identificatie
    zaaktype {
      identificatie
      omschrijving
    }
    startdatum
    status {
      datumStatusGezet
      statustype {
        omschrijving
        isEindstatus
      }
    }
    statusGeschiedenis {
      datumStatusGezet
      statustype {
        omschrijving
        isEindstatus
      }
    }
    statussen {
      omschrijving
    }
    documenten {
      bestandsnaam
      bestandsomvang
      creatiedatum
      formaat
      identificatie
      titel
      uuid
    }
  }
}
    `;

/**
 * __useGetZaakQuery__
 *
 * To run a query within a React component, call `useGetZaakQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetZaakQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetZaakQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetZaakQuery(baseOptions: Apollo.QueryHookOptions<GetZaakQuery, GetZaakQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetZaakQuery, GetZaakQueryVariables>(GetZaakDocument, options);
      }
export function useGetZaakLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetZaakQuery, GetZaakQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetZaakQuery, GetZaakQueryVariables>(GetZaakDocument, options);
        }
export type GetZaakQueryHookResult = ReturnType<typeof useGetZaakQuery>;
export type GetZaakLazyQueryHookResult = ReturnType<typeof useGetZaakLazyQuery>;
export type GetZaakQueryResult = Apollo.QueryResult<GetZaakQuery, GetZaakQueryVariables>;
export const GetZakenDocument = gql`
    query GetZaken {
  getZaken {
    uuid
    omschrijving
    zaaktype {
      identificatie
    }
    startdatum
    status {
      statustype {
        isEindstatus
      }
    }
  }
}
    `;

/**
 * __useGetZakenQuery__
 *
 * To run a query within a React component, call `useGetZakenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetZakenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetZakenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetZakenQuery(baseOptions?: Apollo.QueryHookOptions<GetZakenQuery, GetZakenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetZakenQuery, GetZakenQueryVariables>(GetZakenDocument, options);
      }
export function useGetZakenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetZakenQuery, GetZakenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetZakenQuery, GetZakenQueryVariables>(GetZakenDocument, options);
        }
export type GetZakenQueryHookResult = ReturnType<typeof useGetZakenQuery>;
export type GetZakenLazyQueryHookResult = ReturnType<typeof useGetZakenLazyQuery>;
export type GetZakenQueryResult = Apollo.QueryResult<GetZakenQuery, GetZakenQueryVariables>;