<h1 align="center">Welcome to dto-mapping 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/dto-mapping" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/dto-mapping.svg">
  </a>
  <a href="https://github.com/hoangdevelopers/dto-mapping" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/hoangnd\_58" target="_blank">
    <img alt="Twitter: hoangnd\_58" src="https://img.shields.io/twitter/follow/hoangnd\_58.svg?style=social" />
  </a>
</p>

> A nice greeThe dto-mapping is a mapping library to facilitate the conversion of an entity bean to a similar DTO (Data Transfer Object) bean or reverseter

### 🏠 [Homepage](https://github.com/hoangdevelopers/dto-mapping)

### ✨ [Demo](https://github.com/hoangdevelopers/dto-mapping)

## Install

```sh
npm install dto-mapping
```

## Usage

Create some DTO class:
```typescript
@Entity()
class Info {
  @SafeType({ type: Number })
  age?: Number
  @SafeType({ type: Number })
  numbers?: Number[]
}

@Entity()
class User {
  @SafeType({ type: String })
  name?: String
  @SafeType({ type: Info })
  info?: Info
  constructor(obj: any) {}
}
```

Create an model is implemented by the User class:

```typescript
const model = { 
  name: "1", 
  info: { 
      age: '1', 
      numbers: [1, 2, "3"] 
    } 
}
```

Create DTO instance:

```typescript
const user = new User(model)
```

![sample](assets/01.jpg)


## Run tests

```sh
npm run test
```

## Author

👤 **Hoang Nguyen**

* Website: https://hoangdevelopers.github.io/
* Twitter: [@hoangnd\_58](https://twitter.com/hoangnd\_58)
* Github: [@hoangdevelopers](https://github.com/hoangdevelopers)
* LinkedIn: [@hoang-nguyen-bb95b8111](https://linkedin.com/in/hoang-nguyen-bb95b8111)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_