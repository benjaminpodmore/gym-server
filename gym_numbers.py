import time
import requests
import csv

gym_places = ["claremont_count", "innaloo", "kelmscott_count", "myaree_count",
              "northbridge_count", "oconnor_count", "scarbs_count", "shenton_count", "vic_count"]


def getNumbers():

    current_numbers = []
    current_time = time.localtime(time.time())

    for place in gym_places:
        r = requests.get(
            f"https://revofitness.com.au/wp-content/themes/blankslate/member_visits_api_calls/{place}")
        current_numbers.append(r.text)

    with open('gym_numbers.csv', mode='a') as file:
        writer = csv.writer(file, delimiter=",", quotechar='"',
                            quoting=csv.QUOTE_MINIMAL)

        writer.writerow(
            [time.strftime("%H:%M:%S %Y/%m/%d", current_time)] + current_numbers)


getNumbers()

