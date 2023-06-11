from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from pandas.io.json import json_normalize
import requests
# from tabulate import tabulate
from sklearn.cluster import KMeans

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/Locations/*": {"origins": ["http://localhost:4200"]}})
# Place your API key here.
apiKey = "--KEY--"


@app.route('/url')
def hello():
    return jsonify({'result': 'api/v1/Locations/{}/{}}'})


@app.route('/Locations/<float:position_latitude>/<float:position_longitude>')
def map_clusters(position_latitude, position_longitude):
    url = f'https://discover.search.hereapi.com/v1/discover?in=circle:{position_latitude},{position_longitude};r=10000&q=apartment&apiKey={apiKey}'
    data = requests.get(url).json()
    # # Cleaning API data
    d2 = {}
    d2['items'] = []
    for item in data['items']:
        address = item['address']
        label = address['label']
        d2['items'].append(
            {'title': item['title'], 'label': label, 'distance': item['distance'], 'access': item['access'], 'position.lat': item['position']['lat'], 'position.lng': item['position']['lng'], 'address.postalCode': item['address']['postalCode'], 'id': item['id']})
    # # Counting no. of cafes, department stores and gyms
    # df_final = d2[['position.lat', 'position.lng']]
    total = 0
    CafeList = []
    DepList = []
    GymList = []
    longitudes = []
    latitudes = []
    for item in d2["items"]:
        latitudes.append(item["position.lat"])
        longitudes.append(item["position.lng"])

    for lat, lng in zip(latitudes, longitudes):
        total = total+1
        radius = '1000'  # Set the radius to 1000 metres
        latitude = lat
        longitude = lng

        search_query = 'cafe'  # Search for any cafes
        url = f'https://discover.search.hereapi.com/v1/discover?in=circle:{latitude},{longitude};r={radius}&q={search_query}&apiKey={apiKey}'
        results = requests.get(url).json()
        venues = pd.json_normalize(results['items'])
        if (len(results['items']) == 0):
            CafeList.append(0)
            continue
        CafeList.append(int(venues['title'].count()))

        search_query = 'gym'  # Search for any gyms
        url = f'https://discover.search.hereapi.com/v1/discover?in=circle:{latitude},{longitude};r={radius}&q={search_query}&apiKey={apiKey}'
        results = requests.get(url).json()
        venues = pd.json_normalize(results['items'])
        if (len(results['items']) == 0):
            GymList.append(0)
            continue
        GymList.append(int(venues['title'].count()))

        search_query = 'department-store'  # search for supermarkets
        url = f'https://discover.search.hereapi.com/v1/discover?in=circle:{latitude},{longitude};r={radius}&q={search_query}&apiKey={apiKey}'
        results = requests.get(url).json()
        venues = pd.json_normalize(results['items'])
        if (len(results['items']) == 0):
            DepList.append(0)
            continue
        DepList.append(int(venues['title'].count()))

    if (total != len(CafeList)):
        u = len(CafeList)
        while (u != total):
            u = u+1
            CafeList.append(0)

    if (total != len(GymList)):
        u = len(GymList)
        while (u != total):
            u = u+1
            GymList.append(0)

    if (total != len(DepList)):
        u = len(DepList)
        while (u != total):
            u = u+1
            DepList.append(0)
    df_final = {
        'position_lat': latitudes,
        'position_lng': longitudes,
        'cafe': CafeList,
        'Department_Stores': DepList,
        'Gyms': GymList
    }

    # # Run K-means clustering on dataframe
    kclusters = 3

    data = [[lat for lat in df_final['position_lat']],
            [lng for lng in df_final['position_lng']],
            [cafe for cafe in df_final['cafe']],
            [ds for ds in df_final['Department_Stores']],
            [gym for gym in df_final['Gyms']]]

    # print(data)

    # Converting the 2d Lists into dataframe (each row for contains data for particular location)
    finalList = []
    for i in range(0, len(data[0])):
        finalList.append([data[0][i], data[1][i], data[2]
                          [i], data[3][i], data[4][i]])

    df = pd.DataFrame(finalList, columns=[
        'position_lat', 'position_lng', 'Cafes', 'Department_Stores', 'Gyms'])
    # print(df)

    # applying kmeans clustering
    try:
        clusterFormed = cluster_calculator(kclusters, df)
    except Exception as ex:
        if "should be >=" in str(ex):
            kclusters = 1
            clusterFormed = cluster_calculator(kclusters, df)

    df_final['Cluster'] = clusterFormed
    df_final['position_lat'].append(position_latitude)
    df_final['position_lng'].append(position_longitude)
    return df_final


def cluster_calculator(kclusters, df):
    kmeans = KMeans(n_clusters=kclusters, random_state=0).fit(df)
    cluster = [int(x) for x in kmeans.labels_]
    return cluster


if __name__ == '__main__':
    app.run(debug=True)
