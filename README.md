# (El formato acá está un poco roto, se ve mejor en el archivo documentacion.txt)

# tp2entregafinal
Entrega final de TP 2 ORT 2020

******************************************************
Nombre, descripción, y características de cada recurso
******************************************************

{
    "_id": String,
    "mail": String,
    "condition: float,
    "symbol": String
}

Property name               Value             Description
================================================================================
_id                         String            Unique random value generated when a new subscription is created to identify it
mail                        String            The subscriber e-mail. Must contain an @
condition                   float             It sets the value above which the subscriber wants to be notified. Must be a number. It can contain decimals. Must be a number above 0.
symbol                      String            It's a three characters String that identifies the crypto to which the subscriber is being subscribed.

******************************************
Nombre, ruta y descripción de cada método
******************************************

Subscriptions: create

POST localhost:3000/api/subscription/

Parameter name              Value             Description
================================================================================
Required query parameters
--------------------------------------------------------------------------------
mail                        String            The subscriber e-mail. Must contain an @
condition                   float             It sets the value above which the subscriber wants to be notified. Must be a number. It can contain decimals. Must be a number above 0.
symbol                      String            It's a three characters String that identifies the crypto to which the subscriber is being subscribed.

Subscriptions: delete

DELETE localhost:3000/api/subscription/

Parameter name              Value             Description
================================================================================
Required query parameters
--------------------------------------------------------------------------------
_id                         String            Unique random value generated when a new subscription is created to identify it.

*********************************************************
Características de la petición y respuesta de cada método
*********************************************************

Subscriptions: create

POST localhost:3000/api/subscription/

It creates a new subscription. A succesful response will have a json with a message informing if the subscription was created.
In case there was a problem, you will get a json with an error message. Most common error messages are:
"The mail must contain an @"
"The condition must be a number above 0"
"The symbol must be a string of 3 characters"

Subscriptions: delete

DELETE localhost:3000/api/subscription/

It deletes an existing subscription by providing an id. A succesful response will be a json with a message informing that the subscription was deleted.
In case there was a problem, you will receive a json with an error message. Most common error messages are:
"The subscription does not exist"

===================================================================================
Posibles códigos de estado/error que puede devolver el servidor, y sus significados
===================================================================================

Code                    Description
===================================
200                     Everything worked as expected
400                     There was an error validating the provided parameters
404                     Not found
500                     Internal server error
520                     Unknown error
