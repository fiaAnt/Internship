interface CarFactory {
    createEngine(): string
    createWheels(): string
    createSuspension(): string
}

type Configuration = 'economy' | 'standard' | 'extra';

class EconomyCarPartsFactory implements CarFactory {
    createEngine() { return "1.6L engine" }

    createWheels() { return "16 diameter wheels" }

    createSuspension() { return "Economy suspension" }
}

class StandardCarPartsFactory implements CarFactory {
    createEngine() { return "2.0L engine" }
    createWheels() { return "18 diameter wheels" }
    createSuspension() { return "Standard suspension" }
}

class ExtraCarPartsFactory implements CarFactory {
    createEngine() { return "4.0L engine" }
    createWheels() { return "20 diameter wheels" }
    createSuspension() { return "Extra suspension" }
}

class Car {
    static getCarParts(config: Configuration) {
        let factory: CarFactory
        switch (config) {
            case 'economy': factory = new EconomyCarPartsFactory()
                break
            case 'standard': factory = new StandardCarPartsFactory()
                break
            case 'extra': factory = new ExtraCarPartsFactory()
                break
            default:
                throw new Error('Unknown configuration');
        }

        return {
            engine: factory.createEngine(),
            wheels: factory.createWheels(),
            suspension: factory.createSuspension()
        };
    }
}