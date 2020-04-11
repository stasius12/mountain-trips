import json

import jwt
import requests

from django.contrib.auth import authenticate


def jwt_get_username_from_payload_handler(payload):
    username = payload.get('sub').replace('|', '.')
    authenticate(remote_user=username)
    return username


def jwt_decode_token(token):
    header = jwt.get_unverified_header(token)
    jwks = requests.get(
        'https://mountain-trips.eu.auth0.com/.well-known/jwks.json'
    ).json()
    try:
        public_key = next(
            jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))
            for jwk in jwks['keys'] if jwk['kid'] == header['kid']
        )
    except StopIteration:
        raise Exception('Public key not found.')

    issuer = 'https://mountain-trips.eu.auth0.com/'
    return jwt.decode(
        token,
        public_key,
        audience='https://mountain-trips.eu.auth0.com/api/v2/',
        issuer=issuer,
        algorithms=['RS256'],
    )
