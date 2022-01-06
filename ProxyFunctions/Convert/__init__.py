import logging
import json
import os
import requests

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:

    try: 
        symbol_from = req.params['symbol_from']
        symbol_to = req.params['symbol_to']
        amount = float(req.params['amount'])
    except (ValueError, TypeError, KeyError):
        logging.info('Failed request %s', req.get_body().decode('utf-8'))
        return func.HttpResponse(json.dumps({ 'error': 'invalid request format' }), status_code=400, mimetype="application/json")
    
    try: 
        res = requests.get(
            "https://fcsapi.com/api-v3/forex/converter", 
            params={
                "pair1": symbol_from,
                "pair2": symbol_to,
                "amount": amount,
                "access_key": os.environ["FCSAPI_KEY"],
            })
        if res.status_code != 200:
            return func.HttpResponse(json.dumps({ 'error': 'internal error' }), status_code=500, mimetype="application/json")
        data = res.json()
        if not data.get("status", False):
            return func.HttpResponse(json.dumps({ 'error': 'requested conversion not supported at this time' }), status_code=400, mimetype="application/json")
        return func.HttpResponse(json.dumps(data['response']), mimetype="application/json")

    except requests.exceptions.RequestException: 
        return func.HttpResponse(json.dumps({ 'error': 'internal error' }), status_code=500, mimetype="application/json")
