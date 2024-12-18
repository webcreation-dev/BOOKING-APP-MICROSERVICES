import {
  AbstractDocument,
  RegistryDates,
  RegistryDatesSchema,
} from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  userId: string;

  @Prop()
  placeId: string;

  @Prop()
  invoiceId: string;

  @Prop({ type: RegistryDatesSchema })
  registryDates: RegistryDates;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
