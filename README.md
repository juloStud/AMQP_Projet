# Commandes à exécuter à la récupération de ce projet

### Pré-requis

 - Avoir installé nodeJS<br>
 - Avoir installé Docker
 - Lancer les commandes ci-dessous

 ### Commandes à effectuer dans l'ordre

 **`docker compose up`**

 **`cd api`**

 **`npm start`**

# URL Utiles

### Documentation : `localhost:3000/api-amqp/`<br>

### Rabbitmq : `localhost:15672/`<br>
- login/password => guest/guest

# Architecture
Le modèle, la connexion à la base de données Mariadb ainsi que les routes sont dans le fichier index.js du dossier api.

Le fichier worker.js du dossier api contient la connexion à rabbitmq permettant de consommer le message envoyé depuis l'api et de changer le flag de l'objet dans la base de données.

Le fichier swagger.js du dossier api contient tous les éléments relatifs à la documentation.

# Fonctionnement
- On utilise la route create pour créer un message dans la base de données. Ce message contient un id que l'on ne renseigne pas (auto-incrément), une description (string que l'on renseigne) et un flag qui prend initalement la valeur 1.
- l'api utilise rabbitmq et envoie un message à travers une queue qui sera interprété plus tard par le worker. 
- le worker reçoit le message de l'api et change le flag de l'objet en base pour lui attribuer la valeur 2 correspondant au traitement effectué.




