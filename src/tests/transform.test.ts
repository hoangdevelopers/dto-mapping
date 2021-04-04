import { Entity, Transform, SafeType } from '../index'
test('Transform decorator', () => {
    @Entity()
    class User {
        @Transform({fn: (model: any, field: string) => model[field] && model[field].split(',')})
        locations: string[] = []
        constructor(model: any) {}
    }
    const user = new User({ locations: 'VNM,HKG'})
    expect(user.locations.length).toBe(2);
    expect(user.locations.includes('VNM')).toBe(true);
    expect(user.locations.includes('HKG')).toBe(true);
});

test('Check compatibility of Transform, SafeType decorator', () => {
    @Entity()
    class Location {
        code: string = ''
        constructor(model: any) {}
        getLocation = () => `My location is ${this.code}`
    }
    @Entity()
    class User {
        @Transform({fn: (model: any, field: string) => model[field] 
            && model[field]
            .split(',')
            .map((code: string) => ({
                code
            }))})
        @SafeType({type: Location})
        locations: Location[] = []
        constructor(model: any) {}
    }
    const user = new User({ locations: 'VNM,HKG'})
    expect(user.locations[0].code).toBe('VNM');
    expect(user.locations[1].getLocation()).toBe('My location is HKG');
})
