'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addIftarSpotAction } from '@/lib/actions';
import { useState, useCallback } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { useToast } from '@/hooks/use-toast';
import { foodTypes, FoodType } from '@/lib/types';
import LocationPicker from './location-picker';

type AddIftarSpotDialogProps = {
  onSpotAdded: () => void;
};

export default function AddIftarSpotDialog({ onSpotAdded }: AddIftarSpotDialogProps) {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const formSchema = z.object({
    masjidName: z.string().min(3, { message: 'Mosque/Spot Name must be at least 3 characters.' }),
    area: z.string().min(3, { message: 'Area must be at least 3 characters.' }),
    foodType: z.enum(foodTypes),
    otherFoodTypeName: z.string().optional(),
    latitude: z.number(),
    longitude: z.number(),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Use HH:MM.").optional().or(z.literal('')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      masjidName: '',
      area: '',
      endTime: '',
    },
  });

  const watchFoodType = form.watch('foodType');

  const handleLocationSelect = useCallback((lat: number, lng: number) => {
    setLocation({ lat, lng });
    form.setValue('latitude', lat);
    form.setValue('longitude', lng);
    form.clearErrors('latitude');
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!location) {
      form.setError('latitude', { type: 'manual', message: 'Please select a location on the map.' });
      return;
    }
    setIsSubmitting(true);
    try {
      await addIftarSpotAction(values);
      toast({ title: translations.iftar.addSpotDialog.success });
      form.reset();
      setLocation(null);
      onSpotAdded();
      setOpen(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: (error as Error).message || translations.iftar.addSpotDialog.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="icon" aria-label={translations.iftar.addSpotButton}>
          <Plus className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{translations.iftar.addSpotDialog.title}</DialogTitle>
          <DialogDescription>{translations.iftar.addSpotDialog.description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="masjidName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.iftar.addSpotDialog.masjidName.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={translations.iftar.addSpotDialog.masjidName.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.iftar.addSpotDialog.area.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={translations.iftar.addSpotDialog.area.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.iftar.addSpotDialog.foodType.label}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={translations.iftar.addSpotDialog.foodType.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {foodTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {translations.iftar.foodTypes[type as FoodType]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {watchFoodType === 'others' && (
              <FormField
                control={form.control}
                name="otherFoodTypeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.iftar.addSpotDialog.otherFoodType.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={translations.iftar.addSpotDialog.otherFoodType.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
             <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.iftar.addSpotDialog.endTime.label}</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} placeholder={translations.iftar.addSpotDialog.endTime.placeholder} />
                  </FormControl>
                  <FormDescription>{translations.iftar.addSpotDialog.endTime.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="latitude"
              render={() => (
                <FormItem>
                  <FormLabel>{translations.iftar.addSpotDialog.location.label}</FormLabel>
                  <FormDescription>{translations.iftar.addSpotDialog.location.description}</FormDescription>
                  <FormControl>
                    <div className="h-64 w-full rounded-md border">
                      <LocationPicker onLocationSelect={handleLocationSelect} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                  <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {translations.iftar.addSpotDialog.submitting}
                  </>
                ) : (
                  translations.iftar.addSpotDialog.submitButton
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
