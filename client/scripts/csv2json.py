import csv
import json

csvfile = open('../data.csv', 'r')
jsonfile = open('../data.json', 'w')

fieldnames = ("timestamp","temperature","humidity","pressure","wind_speed","wind_gust","wind_direction")
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
  json.dump(row, jsonfile)
  jsonfile.write('\n')
