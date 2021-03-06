# Launch

- `npm start`
- run MySQL shell : `sudo /usr/bin/mysql -u root -p`
- exit MySQL shell : `exit`

# Todo

- ratingsVotes : id, userId(fk), type(number, fk), value(number), voterId(fk)
- ratingsTypes : id, type(string)

# Doc

- Auth based on https://medium.com/devc-kano/basics-of-authentication-using-passport-and-jwt-with-sequelize-and-mysql-database-748e09d01bab

## MySQL

- https://support.rackspace.com/how-to/install-mysql-server-on-the-ubuntu-operating-system/
- https://fr.wikibooks.org/wiki/MySQL/Parcourir_les_bases_de_donn%C3%A9es

## Other ressources

- Auth : https://www.codementor.io/olatundegaruba/5-steps-to-authenticating-node-js-with-jwt-7ahb5dmyr
- Auth : https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
- Model Associations : https://sequelize.org/master/manual/creating-with-associations.html

## Conventions

### Git prefixes for commits

- :boom: First Commit or MAJOR UPDATE
- :green_book: DOC
- :toilet: CLEANUP
- :star2: FEATURE
- :lock: SECURITY
- :bookmark: TAG
- :hammer: REFACTOR
- :wrench: CONFIG
- :construction: WIP
- :bug: BUGFIX

- [Complete list of github markdown emoji markup](https://gist.github.com/rxaviers/7360908)
