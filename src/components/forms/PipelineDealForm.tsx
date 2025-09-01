import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PipelineDeal } from '@/hooks/usePipelineDeals';

interface PipelineDealFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
  initialData?: Partial<PipelineDeal>;
  isEditing?: boolean;
}

export const PipelineDealForm: React.FC<PipelineDealFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isEditing = false
}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm({
    defaultValues: initialData || {
      title: '',
      value: 0,
      stage: 'prospecting',
      probability: 0,
      days_in_stage: 0,
      last_activity: '',
      notes: ''
    }
  });

  const handleFormSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Deal' : 'Create New Deal'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title', { required: 'Title is required' })}
              placeholder="Deal title"
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="value">Value ($)</Label>
              <Input
                id="value"
                type="number"
                {...register('value', { required: 'Value is required', valueAsNumber: true })}
                placeholder="5000"
              />
              {errors.value && <p className="text-sm text-red-500">{errors.value.message}</p>}
            </div>
            <div>
              <Label htmlFor="probability">Probability (%)</Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                {...register('probability', { valueAsNumber: true })}
                placeholder="75"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="stage">Stage</Label>
            <Select defaultValue={initialData?.stage || 'prospecting'} onValueChange={(value) => setValue('stage', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prospecting">Prospecting</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expected_close">Expected Close Date</Label>
              <Input
                id="expected_close"
                type="date"
                {...register('expected_close')}
              />
            </div>
            <div>
              <Label htmlFor="days_in_stage">Days in Stage</Label>
              <Input
                id="days_in_stage"
                type="number"
                {...register('days_in_stage', { valueAsNumber: true })}
                placeholder="15"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="last_activity">Last Activity</Label>
            <Input
              id="last_activity"
              {...register('last_activity')}
              placeholder="Called client, sent proposal"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Additional notes about the deal"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};