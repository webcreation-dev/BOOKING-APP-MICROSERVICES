import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class RegistryDates {
  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const RegistryDatesSchema = SchemaFactory.createForClass(RegistryDates);
