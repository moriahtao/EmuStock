# EmuStock
Semester Project of CS5610 WebDev 2016 Fall   

### Authors
* Fan Yang: yang.fan7@husky.neu.edu 
* Qianli Ma: 

### Description
EmuStock is a social platform of stock market game playing. Users execute stock transactions with virtual credits, which is given at the beginning of each challenge season.

### Actors
For this online stock emulator, the actors can be *buyers* and *administrators*.  
* **Buyers** - normal users, buying shares during challenge seasons, connecting to and communicating with each others.
* **Admins** - managing users' accounts, posts, and hosting challenge seasons.

### Required Data Model
1. **User** - personal information 
2. **Domain object** - stock entities, pieces of related news
3. **User to user relationship** - follows, comments under stocks 
4. **User to domain object relationship** - user buy, hold, and sell stock shares
5. **Domain to domain relationship** - a portfolio has many stocks 
6. **One to many relationships** - a stock has many reviews
7. **Many to many relationships** - a users has many followings and followers, a user reviews/holds many stocks and a stock is reviewed/held by many users

### Feature Requirements
1. **Home page**
2. **Login / Register**
3. **Profile**
4. **Search / Search Results** - find stocks by name or id
5. **Details Page** - show stats data of certain stock
6. **Social Networking** - user communications
7. **Web Service** - Finance, News
