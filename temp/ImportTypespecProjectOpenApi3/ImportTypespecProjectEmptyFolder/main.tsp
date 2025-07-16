import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;

/**
 * Text translation is a cloud-based REST API feature of the Translator service that uses neural
 * machine translation technology to enable quick and accurate source-to-target text translation
 * in real time across all supported languages.
 *
 * The following methods are supported by the Text Translation feature:
 *
 * Languages. Returns a list of languages supported by Translate, Transliterate, and Dictionary Lookup operations.
 *
 * Translate. Renders single source-language text to multiple target-language texts with a single request.
 *
 * Transliterate. Converts characters or letters of a source language to the corresponding characters or letters of a target language.
 *
 * Detect. Returns the source code language code and a boolean variable denoting whether the detected language is supported for text translation and transliteration.
 *
 * Dictionary lookup. Returns equivalent words for the source term in the target language.
 *
 * Dictionary example Returns grammatical structure and context examples for the source term and target term pair.
 */
@service(#{ title: "Text Translation" })
@info(#{ version: "3.0" })
namespace TextTranslation;

/**
 * Text Translation supported versions
 */
enum APIVersion {
  `3.0`,
}

/**
 * Back Translation
 */
model BackTranslation {
  /**
   * A string giving the normalized form of the source term that is a back-translation of the target.
   * This value should be used as input to lookup examples.
   */
  normalizedText: string;

  /**
   * A string giving the source term that is a back-translation of the target in a form best
   * suited for end-user display.
   */
  displayText: string;

  /**
   * An integer representing the number of examples that are available for this translation pair.
   * Actual examples must be retrieved with a separate call to lookup examples. The number is mostly
   * intended to facilitate display in a UX. For example, a user interface may add a hyperlink
   * to the back-translation if the number of examples is greater than zero and show the back-translation
   * as plain text if there are no examples. Note that the actual number of examples returned
   * by a call to lookup examples may be less than numExamples, because additional filtering may be
   * applied on the fly to remove "bad" examples.
   */
  numExamples: int32;

  /**
   * An integer representing the frequency of this translation pair in the data. The main purpose of this
   * field is to provide a user interface with a means to sort back-translations so the most frequent terms are first.
   */
  frequencyCount: int32;
}

/**
 * Item containing break sentence result.
 */
model BreakSentenceItem {
  /**
   * The detectedLanguage property is only present in the result object when language auto-detection is requested.
   */
  detectedLanguage?: DetectedLanguage;

  /**
   * An integer array representing the lengths of the sentences in the input text.
   * The length of the array is the number of sentences, and the values are the length of each sentence.
   */
  sentLen: int32[];
}

/**
 * An object describing the detected language.
 */
model DetectedLanguage {
  /**
   * A string representing the code of the detected language.
   */
  language: string;

  /**
   * A float value indicating the confidence in the result.
   * The score is between zero and one and a low score indicates a low confidence.
   */
  score: float32;
}

/**
 * Dictionary Example
 */
model DictionaryExample {
  /**
   * The string to concatenate before the value of sourceTerm to form a complete example.
   * Do not add a space character, since it is already there when it should be.
   * This value may be an empty string.
   */
  sourcePrefix: string;

  /**
   * A string equal to the actual term looked up. The string is added with sourcePrefix
   * and sourceSuffix to form the complete example. Its value is separated so it can be
   * marked in a user interface, e.g., by bolding it.
   */
  sourceTerm: string;

  /**
   * The string to concatenate after the value of sourceTerm to form a complete example.
   * Do not add a space character, since it is already there when it should be.
   * This value may be an empty string.
   */
  sourceSuffix: string;

  /**
   * A string similar to sourcePrefix but for the target.
   */
  targetPrefix: string;

  /**
   * A string similar to sourceTerm but for the target.
   */
  targetTerm: string;

  /**
   * A string similar to sourceSuffix but for the target.
   */
  targetSuffix: string;
}

/**
 * Dictionary Example element
 */
model DictionaryExampleItem {
  /**
   * A string giving the normalized form of the source term. Generally, this should be identical
   * to the value of the Text field at the matching list index in the body of the request.
   */
  normalizedSource: string;

  /**
   * A string giving the normalized form of the target term. Generally, this should be identical
   * to the value of the Translation field at the matching list index in the body of the request.
   */
  normalizedTarget: string;

  /**
   * A list of examples for the (source term, target term) pair.
   */
  examples: DictionaryExample[];
}

/**
 * Element containing the text with translation.
 */
model DictionaryExampleTextItem {
  ...InputTextItem;

  /**
   * A string specifying the translated text previously returned by the Dictionary lookup operation.
   * This should be the value from the normalizedTarget field in the translations list of the Dictionary
   * lookup response. The service will return examples for the specific source-target word-pair.
   */
  translation: string;
}

/**
 * Dictionary Lookup Element
 */
model DictionaryLookupItem {
  /**
   * A string giving the normalized form of the source term.
   * For example, if the request is "JOHN", the normalized form will be "john".
   * The content of this field becomes the input to lookup examples.
   */
  normalizedSource: string;

  /**
   * A string giving the source term in a form best suited for end-user display.
   * For example, if the input is "JOHN", the display form will reflect the usual
   * spelling of the name: "John".
   */
  displaySource: string;

  /**
   * A list of translations for the source term.
   */
  translations: DictionaryTranslation[];
}

/**
 * Translation source term.
 */
model DictionaryTranslation {
  /**
   * A string giving the normalized form of this term in the target language.
   * This value should be used as input to lookup examples.
   */
  normalizedTarget: string;

  /**
   * A string giving the term in the target language and in a form best suited
   * for end-user display. Generally, this will only differ from the normalizedTarget
   * in terms of capitalization. For example, a proper noun like "Juan" will have
   * normalizedTarget = "juan" and displayTarget = "Juan".
   */
  displayTarget: string;

  /**
   * A string associating this term with a part-of-speech tag.
   */
  posTag: string;

  /**
   * A value between 0.0 and 1.0 which represents the "confidence"
   * (or perhaps more accurately, "probability in the training data") of that translation pair.
   * The sum of confidence scores for one source word may or may not sum to 1.0.
   */
  confidence: float32;

  /**
   * A string giving the word to display as a prefix of the translation. Currently,
   * this is the gendered determiner of nouns, in languages that have gendered determiners.
   * For example, the prefix of the Spanish word "mosca" is "la", since "mosca" is a feminine noun in Spanish.
   * This is only dependent on the translation, and not on the source.
   * If there is no prefix, it will be the empty string.
   */
  prefixWord: string;

  /**
   * A list of "back translations" of the target. For example, source words that the target can translate to.
   * The list is guaranteed to contain the source word that was requested (e.g., if the source word being
   * looked up is "fly", then it is guaranteed that "fly" will be in the backTranslations list).
   * However, it is not guaranteed to be in the first position, and often will not be.
   */
  backTranslations: BackTranslation[];
}

/**
 * Error details as returned by Translator Service.
 */
model ErrorDetails {
  /**
   * Number identifier of the error.
   */
  code: int32;

  /**
   * Human readable error description.
   */
  message: string;
}

/**
 * Representation of the Error Response from Translator Service.
 */
model ErrorResponse {
  /**
   * Error details.
   */
  error: ErrorDetails;
}

/**
 * Response for the languages API.
 */
model GetSupportedLanguagesResult {
  /**
   * Languages that support translate API.
   */
  translation?: Record<TranslationLanguage>;

  /**
   * Languages that support transliteration API.
   */
  transliteration?: Record<TransliterationLanguage>;

  /**
   * Languages that support dictionary API.
   */
  dictionary?: Record<SourceDictionaryLanguage>;
}

/**
 * Element containing the text for translation.
 */
model InputTextItem {
  /**
   * Text to translate.
   */
  text: string;
}

/**
 * Language Directionality
 */
enum LanguageDirectionality {
  ltr,
  rtl,
}

/**
 * Common properties of language script
 */
model LanguageScript {
  /**
   * Code identifying the script.
   */
  code: string;

  /**
   * Display name of the script in the locale requested via Accept-Language header.
   */
  name: string;

  /**
   * Display name of the language in the locale native for the language.
   */
  nativeName: string;

  /**
   * Directionality, which is rtl for right-to-left languages or ltr for left-to-right languages.
   */
  dir: LanguageDirectionality;
}

/**
 * Translator profanity actions
 */
enum ProfanityAction {
  NoAction,
  Marked,
  Deleted,
}

/**
 * Translator profanity markers
 */
enum ProfanityMarker {
  Asterisk,
  Tag,
}

/**
 * An object returning sentence boundaries in the input and output texts.
 */
model SentenceBoundaries {
  /**
   * An integer array representing the lengths of the sentences in the input text.
   * The length of the array is the number of sentences, and the values are the length of each sentence.
   */
  srcSentLen: int32[];

  /**
   * An integer array representing the lengths of the sentences in the translated text.
   * The length of the array is the number of sentences, and the values are the length of each sentence.
   */
  transSentLen: int32[];
}

/**
 * Properties ot the source dictionary language
 */
model SourceDictionaryLanguage {
  /**
   * Display name of the language in the locale requested via Accept-Language header.
   */
  name: string;

  /**
   * Display name of the language in the locale native for this language.
   */
  nativeName: string;

  /**
   * Directionality, which is rtl for right-to-left languages or ltr for left-to-right languages.
   */
  dir: LanguageDirectionality;

  /**
   * List of languages with alterative translations and examples for the query expressed in the source language.
   */
  translations: TargetDictionaryLanguage[];
}

/**
 * Input text in the default script of the source language.
 */
model SourceText {
  /**
   * Input text in the default script of the source language.
   */
  text: string;
}

/**
 * Properties of the target dictionary language
 */
model TargetDictionaryLanguage {
  /**
   * Display name of the language in the locale requested via Accept-Language header.
   */
  name: string;

  /**
   * Display name of the language in the locale native for this language.
   */
  nativeName: string;

  /**
   * Directionality, which is rtl for right-to-left languages or ltr for left-to-right languages.
   */
  dir: LanguageDirectionality;

  /**
   * Language code identifying the target language.
   */
  code: string;
}

/**
 * Translation text type
 */
union TextType {
  string,
  "Plain" | "Html",
}

/**
 * Alignment information object.
 */
model TranslatedTextAlignment {
  /**
   * Maps input text to translated text. The alignment information is only provided when the request
   * parameter includeAlignment is true. Alignment is returned as a string value of the following
   * format: [[SourceTextStartIndex]:[SourceTextEndIndex]–[TgtTextStartIndex]:[TgtTextEndIndex]].
   * The colon separates start and end index, the dash separates the languages, and space separates the words.
   * One word may align with zero, one, or multiple words in the other language, and the aligned words may
   * be non-contiguous. When no alignment information is available, the alignment element will be empty.
   */
  proj: string;
}

/**
 * Element containing the translated text
 */
model TranslatedTextItem {
  /**
   * The detectedLanguage property is only present in the result object when language auto-detection is requested.
   */
  detectedLanguage?: DetectedLanguage;

  /**
   * An array of translation results. The size of the array matches the number of target
   * languages specified through the to query parameter.
   */
  translations: TranslationText[];

  /**
   * Input text in the default script of the source language. sourceText property is present only when
   * the input is expressed in a script that's not the usual script for the language. For example,
   * if the input were Arabic written in Latin script, then sourceText.text would be the same Arabic text
   * converted into Arab script.
   */
  sourceText?: SourceText;
}

/**
 * The value of the translation property is a dictionary of (key, value) pairs. Each key is a BCP 47 language tag.
 * A key identifies a language for which text can be translated to or translated from.
 */
model TranslationLanguage {
  /**
   * Display name of the language in the locale requested via Accept-Language header.
   */
  name: string;

  /**
   * Display name of the language in the locale native for this language.
   */
  nativeName: string;

  /**
   * Directionality, which is rtl for right-to-left languages or ltr for left-to-right languages.
   */
  dir: LanguageDirectionality;
}

/**
 * Translation result
 */
model TranslationText {
  /**
   * A string representing the language code of the target language.
   */
  to: string;

  /**
   * A string giving the translated text.
   */
  text: string;

  /**
   * An object giving the translated text in the script specified by the toScript parameter.
   */
  transliteration?: TransliteratedText;

  /**
   * Alignment information.
   */
  alignment?: TranslatedTextAlignment;

  /**
   * Sentence boundaries in the input and output texts.
   */
  sentLen?: SentenceBoundaries;
}

/**
 * Script definition with list of script into which given script can be translitered.
 */
model TransliterableScript {
  ...LanguageScript;

  /**
   * List of scripts available to convert text to.
   */
  toScripts: LanguageScript[];
}

/**
 * Transliterated text element.
 */
model TransliteratedText {
  /**
   * A string which is the result of converting the input string to the output script.
   */
  text: string;

  /**
   * A string specifying the script used in the output.
   */
  script: string;
}

/**
 * The value of the transliteration property is a dictionary of (key, value) pairs.
 * Each key is a BCP 47 language tag. A key identifies a language for which text can be converted from one script
 * to another script.
 */
model TransliterationLanguage {
  /**
   * Display name of the language in the locale requested via Accept-Language header.
   */
  name: string;

  /**
   * Display name of the language in the locale native for this language.
   */
  nativeName: string;

  /**
   * List of scripts to convert from.
   */
  scripts: TransliterableScript[];
}

/**
 * Find Sentence Boundaries
 */
@route("/breaksentence")
@post
@summary("Find Sentence Boundaries")
op findSentenceBoundaries(
  /**
   * A client-generated GUID to uniquely identify the request.
   */
  @header `X-ClientTraceId`?: string,

  ...Parameters.BreakSentenceParameters.language,
  ...Parameters.BreakSentenceParameters.script,

  /**
   * Mandatory API version parameter
   */
  @query `api-version`: string,

  /**
   * Defines the content of the request
   */
  @body body: InputTextItem[],
): {
  /**
   * Value generated by the service to identify the request. It is used for troubleshooting purposes.
   */
  @header("X-RequestId") XRequestId: string;

  @body body: BreakSentenceItem[];
} | GeneratedHelpers.DefaultResponse<
  Description = "An unexpected error response.",
  Headers = {
    /**
     * Value generated by the service to identify the request. It is used for troubleshooting purposes.
     */
    @header("X-RequestId") XRequestId: string;
  },
  Body = ErrorResponse
>;

/**
 * Lookup Dictionary Examples
 */
@route("/dictionary/examples")
@post
@summary("Lookup Dictionary Examples")
op lookupDictionaryExamples(
  /**
   * A client-generated GUID to uniquely identify the request.
   */
  @header `X-ClientTraceId`?: string,

  ...Parameters.DictionaryExamplesParameters.from,
  ...Parameters.DictionaryExamplesParameters.to,

  /**
   * Mandatory API version parameter
   */
  @query `api-version`: string,

  /**
   * Defines the content of the request
   */
  @body body: DictionaryExampleTextItem[],
): {
  /**
   * Value generated by the service to identify the request. It is used for troubleshooting purposes.
   */
  @header("X-RequestId") XRequestId: string;

  @body body: DictionaryExampleItem[];
} | GeneratedHelpers.DefaultResponse<
  Description = "An unexpected error response.",
  Headers = {
    /**
     * Value generated by the service to identify the request. It is used for troubleshooting purposes.
     */
    @header("X-RequestId") XRequestId: string;
  },
  Body = ErrorResponse
>;

/**
 * Lookup Dictionary Entries
 */
@route("/dictionary/lookup")
@post
@summary("Lookup Dictionary Entries")
op lookupDictionaryEntries(
  /**
   * A client-generated GUID to uniquely identify the request.
   */
  @header `X-ClientTraceId`?: string,

  ...Parameters.DictionaryLookupParameters.from,
  ...Parameters.DictionaryLookupParameters.to,

  /**
   * Mandatory API version parameter
   */
  @query `api-version`: string,

  /**
   * Defines the content of the request
   */
  @body body: InputTextItem[],
): {
  /**
   * Value generated by the service to identify the request. It is used for troubleshooting purposes.
   */
  @header("X-RequestId") XRequestId: string;

  @body body: DictionaryLookupItem[];
} | GeneratedHelpers.DefaultResponse<
  Description = "An unexpected error response.",
  Headers = {
    /**
     * Value generated by the service to identify the request. It is used for troubleshooting purposes.
     */
    @header("X-RequestId") XRequestId: string;
  },
  Body = ErrorResponse
>;

/**
 * Gets the set of languages currently supported by other operations of the Translator.
 */
@route("/languages")
@get
@summary("Gets the set of languages currently supported by other operations of the Translator.")
op getSupportedLanguages(
  /**
   * A client-generated GUID to uniquely identify the request.
   */
  @header `X-ClientTraceId`?: string,

  ...Parameters.GetSupportedLanguagesParameters.scope,
  ...Parameters.GetSupportedLanguagesParameters.acceptLanguage,
  ...Parameters.GetSupportedLanguagesParameters.ifNoneMatch,

  /**
   * Mandatory API version parameter
   */
  @query `api-version`: string,
): {
  /**
   * Value generated by the service to identify the request. It is used for troubleshooting purposes.
   */
  @header("X-RequestId") XRequestId: string;

  /**
   * Current value of the entity tag for the requested groups of supported languages.
   * To make subsequent requests more efficient, the client may send the `ETag` value in an
   * `If-None-Match` header field.
   */
  @header ETag: string;

  @body body: GetSupportedLanguagesResult;
} | GeneratedHelpers.DefaultResponse<
  Description = "An unexpected error response.",
  Headers = {
    /**
     * Value generated by the service to identify the request. It is used for troubleshooting purposes.
     */
    @header("X-RequestId") XRequestId: string;
  },
  Body = ErrorResponse
>;

/**
 * Translate Text
 */
@route("/translate")
@post
@summary("Translate Text")
op translate(
  /**
   * A client-generated GUID to uniquely identify the request.
   */
  @header `X-ClientTraceId`?: string,

  ...Parameters.TranslateParameters.to,
  ...Parameters.TranslateParameters.from,
  ...Parameters.TranslateParameters.textType,
  ...Parameters.TranslateParameters.category,
  ...Parameters.TranslateParameters.profanityAction,
  ...Parameters.TranslateParameters.profanityMarker,
  ...Parameters.TranslateParameters.includeAlignment,
  ...Parameters.TranslateParameters.includeSentenceLength,
  ...Parameters.TranslateParameters.suggestedFrom,
  ...Parameters.TranslateParameters.fromScript,
  ...Parameters.TranslateParameters.toScript,
  ...Parameters.TranslateParameters.allowFallback,

  /**
   * Mandatory API version parameter
   */
  @query `api-version`: string,

  /**
   * Defines the content of the request
   */
  @body body: InputTextItem[],
): {
  /**
   * Value generated by the service to identify the request. It is used for troubleshooting purposes.
   */
  @header("X-RequestId") XRequestId: string;

  /**
   * Specifies the system type that was used for translation for each 'to' language requested for translation.
   * The value is a comma-separated list of strings. Each string indicates a type:
   *
   * * Custom - Request includes a custom system and at least one custom system was used during translation.
   * * Team - All other requests
   */
  @header("x-mt-system") xMtSystem: string;

  /**
   * Specifies consumption (the number of characters for which the user will be charged) for the translation
   * job request. For example, if the word "Hello" is translated from English (en) to French (fr),
   * this field will return the value '5'.
   */
  @header("x-metered-usage") xMeteredUsage: int32;

  @body body: TranslatedTextItem[];
} | GeneratedHelpers.DefaultResponse<
  Description = "An unexpected error response.",
  Headers = {
    /**
     * Value generated by the service to identify the request. It is used for troubleshooting purposes.
     */
    @header("X-RequestId") XRequestId: string;
  },
  Body = ErrorResponse
>;

/**
 * Transliterate Text
 */
@route("/transliterate")
@post
@summary("Transliterate Text")
op transliterate(
  /**
   * A client-generated GUID to uniquely identify the request.
   */
  @header `X-ClientTraceId`?: string,

  ...Parameters.TransliterateParameters.language,
  ...Parameters.TransliterateParameters.fromScript,
  ...Parameters.TransliterateParameters.toScript,

  /**
   * Mandatory API version parameter
   */
  @query `api-version`: string,

  /**
   * Defines the content of the request
   */
  @body body: InputTextItem[],
): {
  /**
   * Value generated by the service to identify the request. It is used for troubleshooting purposes.
   */
  @header("X-RequestId") XRequestId: string;

  @body body: TransliteratedText[];
} | GeneratedHelpers.DefaultResponse<
  Description = "An unexpected error response.",
  Headers = {
    /**
     * Value generated by the service to identify the request. It is used for troubleshooting purposes.
     */
    @header("X-RequestId") XRequestId: string;
  },
  Body = ErrorResponse
>;

namespace Parameters {
  namespace BreakSentenceParameters {
    model language {
      /**
       * Language tag identifying the language of the input text.
       * If a code isn't specified, automatic language detection will be applied.
       */
      @query language?: string;
    }
    model script {
      /**
       * Script tag identifying the script used by the input text.
       * If a script isn't specified, the default script of the language will be assumed.
       */
      @query script?: string;
    }
  }
  namespace DictionaryExamplesParameters {
    model from {
      /**
       * Specifies the language of the input text.
       * The source language must be one of the supported languages included in the dictionary scope.
       */
      @query from: string;
    }
    model to {
      /**
       * Specifies the language of the output text.
       * The target language must be one of the supported languages included in the dictionary scope.
       */
      @query to: string;
    }
  }
  namespace DictionaryLookupParameters {
    model from {
      /**
       * Specifies the language of the input text.
       * The source language must be one of the supported languages included in the dictionary scope.
       */
      @query from: string;
    }
    model to {
      /**
       * Specifies the language of the output text.
       * The target language must be one of the supported languages included in the dictionary scope.
       */
      @query to: string;
    }
  }
  namespace GetSupportedLanguagesParameters {
    model acceptLanguage {
      /**
       * The language to use for user interface strings. Some of the fields in the response are names of languages or
       * names of regions. Use this parameter to define the language in which these names are returned.
       * The language is specified by providing a well-formed BCP 47 language tag. For instance, use the value `fr`
       * to request names in French or use the value `zh-Hant` to request names in Chinese Traditional.
       * Names are provided in the English language when a target language is not specified or when localization
       * is not available.
       */
      @header `Accept-Language`?: string = "en";
    }
    model ifNoneMatch {
      /**
       * Passing the value of the ETag response header in an If-None-Match field will allow the service to optimize the response.
       * If the resource has not been modified, the service will return status code 304 and an empty response body.
       */
      @header `If-None-Match`?: string;
    }
    model scope {
      /**
       * A comma-separated list of names defining the group of languages to return.
       * Allowed group names are: `translation`, `transliteration` and `dictionary`.
       * If no scope is given, then all groups are returned, which is equivalent to passing
       * `scope=translation,transliteration,dictionary`. To decide which set of supported languages
       * is appropriate for your scenario, see the description of the [response object](#response-body).
       */
      @query scope?: string;
    }
  }
  namespace TranslateParameters {
    model allowFallback {
      /**
       * Specifies that the service is allowed to fall back to a general system when a custom system doesn't exist.
       * Possible values are: true (default) or false.
       *
       * allowFallback=false specifies that the translation should only use systems trained for the category specified
       * by the request. If a translation for language X to language Y requires chaining through a pivot language E,
       * then all the systems in the chain (X → E and E → Y) will need to be custom and have the same category.
       * If no system is found with the specific category, the request will return a 400 status code. allowFallback=true
       * specifies that the service is allowed to fall back to a general system when a custom system doesn't exist.
       */
      @query allowFallback?: boolean = true;
    }
    model category {
      /**
       * A string specifying the category (domain) of the translation. This parameter is used to get translations
       * from a customized system built with Custom Translator. Add the Category ID from your Custom Translator
       * project details to this parameter to use your deployed customized system. Default value is: general.
       */
      @query category?: string = "general";
    }
    model from {
      /**
       * Specifies the language of the input text. Find which languages are available to translate from by
       * looking up supported languages using the translation scope. If the from parameter isn't specified,
       * automatic language detection is applied to determine the source language.
       *
       * You must use the from parameter rather than autodetection when using the dynamic dictionary feature.
       * Note: the dynamic dictionary feature is case-sensitive.
       */
      @query from?: string;
    }
    model fromScript {
      /**
       * Specifies the script of the input text.
       */
      @query fromScript?: string;
    }
    model includeAlignment {
      /**
       * Specifies whether to include alignment projection from source text to translated text.
       * Possible values are: true or false (default).
       */
      @query includeAlignment?: boolean;
    }
    model includeSentenceLength {
      /**
       * Specifies whether to include sentence boundaries for the input text and the translated text.
       * Possible values are: true or false (default).
       */
      @query includeSentenceLength?: boolean;
    }
    model profanityAction {
      /**
       * Specifies how profanities should be treated in translations.
       * Possible values are: NoAction (default), Marked or Deleted.
       */
      @query profanityAction?: TextTranslation.ProfanityAction;
    }
    model profanityMarker {
      /**
       * Specifies how profanities should be marked in translations.
       * Possible values are: Asterisk (default) or Tag.
       */
      @query profanityMarker?: TextTranslation.ProfanityMarker;
    }
    model suggestedFrom {
      /**
       * Specifies a fallback language if the language of the input text can't be identified.
       * Language autodetection is applied when the from parameter is omitted. If detection fails,
       * the suggestedFrom language will be assumed.
       */
      @query suggestedFrom?: string;
    }
    model textType {
      /**
       * Defines whether the text being translated is plain text or HTML text. Any HTML needs to be a well-formed,
       * complete element. Possible values are: plain (default) or html.
       */
      @query textType?: TextTranslation.TextType;
    }
    model to {
      /**
       * Specifies the language of the output text. The target language must be one of the supported languages included
       * in the translation scope. For example, use to=de to translate to German.
       * It's possible to translate to multiple languages simultaneously by repeating the parameter in the query string.
       * For example, use to=de&to=it to translate to German and Italian.
       */
      @query(#{ explode: true }) to: string[];
    }
    model toScript {
      /**
       * Specifies the script of the translated text.
       */
      @query toScript?: string;
    }
  }
  namespace TransliterateParameters {
    model fromScript {
      /**
       * Specifies the script used by the input text. Look up supported languages using the transliteration scope,
       * to find input scripts available for the selected language.
       */
      @query fromScript: string;
    }
    model language {
      /**
       * Specifies the language of the text to convert from one script to another.
       * Possible languages are listed in the transliteration scope obtained by querying the service
       * for its supported languages.
       */
      @query language: string;
    }
    model toScript {
      /**
       * Specifies the output script. Look up supported languages using the transliteration scope, to find output
       * scripts available for the selected combination of input language and input script.
       */
      @query toScript: string;
    }
  }
}
namespace GeneratedHelpers {
  @doc(Description)
  @error
  model DefaultResponse<
    Description extends valueof string = "",
    Body = void,
    Headers extends {} = {}
  > {
    @body body: Body;
    ...Headers;
  }
}
