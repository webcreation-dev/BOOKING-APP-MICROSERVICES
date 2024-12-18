import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class GenericValidatorConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: any, args: ValidationArguments) {
    const [model, property, validationType] = args.constraints;
    const count = await model.countDocuments({ [property]: value });

    if (validationType === 'exists') {
      return count > 0;
    } else if (validationType === 'unique') {
      return count === 0;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const [model, property, validationType] = args.constraints;
    if (validationType === 'exists') {
      return `${property} does not exist in ${model.modelName}`;
    } else if (validationType === 'unique') {
      return `${property} already exists in ${model.modelName}`;
    }
    return `${property} validation failed in ${model.modelName}`;
  }
}
