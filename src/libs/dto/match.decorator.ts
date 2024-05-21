import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }
}

@ValidatorConstraint({ name: 'IsTenDigitNumber', async: false })
export class IsTenDigitNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(mobile_no: any, args: ValidationArguments) {
    const isValidNumber =
      typeof mobile_no === 'number' && Number.isInteger(mobile_no);
    const isTenDigits =
      isValidNumber && mobile_no >= 1000000000 && mobile_no <= 9999999999;
    return isValidNumber && isTenDigits;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a 10-digit number`;
  }
}

